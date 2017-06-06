package cz.cvut.fel.aeroticket.validation;


import cz.cvut.fel.aeroticket.dto.ReservationDTO;
import cz.cvut.fel.aeroticket.dto.ReservationItemDTO;
import cz.cvut.fel.aeroticket.model.reservation.ReservationStatus;
import cz.cvut.fel.aeroticket.service.FlightService;
import cz.cvut.fel.aeroticket.service.ReservationService;
import cz.cvut.fel.aeroticket.validation.dto.ValidationResult;

import javax.ejb.Singleton;
import javax.inject.Inject;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@Singleton
public class ReservationValidatorImpl implements ReservationValidator {

    @Inject
    private FlightService flightService;

    @Inject
    private ReservationService reservationService;

    @Override
    public ValidationResult canBeCreated(ReservationDTO reservationDTO) {
        ValidationResult commonValidationResult = commonValidation(reservationDTO);
        if (!commonValidationResult.isValid()) {
            return commonValidationResult;
        }

        if (!isEnoughSeatsAvailable(reservationDTO, false)) {
            System.out.println("Not enough seats available");
            return ValidationResult.failed("Not enough seats available");
        }

        if (reservationDTO.getReservationStatus() != null && !ReservationStatus.NEW.equals(reservationDTO.getReservationStatus())) {
            System.out.println("Reservation status incorrect");
            return ValidationResult.failed("Reservation status incorrect");
        }

        return ValidationResult.succeed();
    }

    @Override
    public ValidationResult canBeUpdated(ReservationDTO reservationDTO) {
        ValidationResult commonValidationResult = commonValidation(reservationDTO);
        if (!commonValidationResult.isValid()) {
            return commonValidationResult;
        }
        if (!isEnoughSeatsAvailable(reservationDTO, true)) {
            System.out.println("Not enough seats available");
            return ValidationResult.failed("Not enough seats available");
        }


        return ValidationResult.succeed();

    }

/*    @Override
    public ValidationResult canBeDeleted(ReservationDTO reservationDTO) {
        return ValidationResult.succeed();
    }*/

    private ValidationResult commonValidation(ReservationDTO reservationDTO) {
        if (reservationDTO.getReservationItems().size() == 0) {
            return ValidationResult.failed("Reservation must contain at least 1 flight");
        }

        if (!adultsAreFlying(reservationDTO.getReservationItems())) {
            return ValidationResult.failed("On every flight should be at least 1 adult person");
        }

        return ValidationResult.succeed();
    }

    private boolean isEnoughSeatsAvailable(ReservationDTO reservationDTO, boolean isUpdate) {
        return getRequiredSeats(reservationDTO.getReservationItems())
                .entrySet()
                .stream()
                .allMatch(entry -> isEnoughSeatsAvailable(entry.getKey(), reservationDTO.getId(), entry.getValue(), isUpdate));
    }

    private Map<Long, Integer> getRequiredSeats(Set<ReservationItemDTO> items) {
        Map<Long, Integer> flightsMap = new HashMap<>();
        items.forEach((reservationItem) -> flightsMap.compute(reservationItem.getFlight(), (k, v) -> (v == null)
                ? getNumberRequiredNumberOfSeats(reservationItem)
                : v + getNumberRequiredNumberOfSeats(reservationItem)));
        return flightsMap;
    }

    private boolean isEnoughSeatsAvailable(Long flightId, Long reservationId, Integer numberOfSeats, boolean isUpdate) {
        Integer currentReservationCount = 0;
        if (isUpdate) {
            currentReservationCount = reservationService.getAvailableSeatsCount(flightId, reservationId);
        }
        return (flightService.getAvailableSeatsCount(flightId) ) >= numberOfSeats-currentReservationCount;
    }

    private boolean adultsAreFlying(Set<ReservationItemDTO> items) {
        Map<Long, Boolean> flightsMap = new HashMap<>();
        items.forEach(reservationItem -> flightsMap.compute(reservationItem.getFlight(), (k, v) -> (v == null)
                ? reservationItem.getPassengerType().isCanFlightAlone()
                : (reservationItem.getPassengerType().isCanFlightAlone() || v)));
        return flightsMap
                .entrySet()
                .stream()
                .allMatch(Map.Entry::getValue);
    }

    private int getNumberRequiredNumberOfSeats(ReservationItemDTO reservationItem) {
        if (reservationItem.getPassengerType().isRequestSeat()) {
            return reservationItem.getNumberOfTickets();
        }
        return 0;
    }

}
