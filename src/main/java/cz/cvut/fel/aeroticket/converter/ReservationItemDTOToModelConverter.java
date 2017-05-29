package cz.cvut.fel.aeroticket.converter;

import cz.cvut.fel.aeroticket.dto.ReservationItemDTO;
import cz.cvut.fel.aeroticket.exception.NotFoundException;
import cz.cvut.fel.aeroticket.model.Flight;
import cz.cvut.fel.aeroticket.model.ReservationItem;
import cz.cvut.fel.aeroticket.repository.FlightRepository;

import javax.ejb.Singleton;
import javax.inject.Inject;
import java.util.Optional;
import java.util.logging.Logger;

@Singleton
public class ReservationItemDTOToModelConverter implements Converter<ReservationItemDTO, ReservationItem> {

    private final static Logger logger = Logger.getLogger(ReservationItemDTOToModelConverter.class.getName());

    @Inject
    private FlightRepository flightRepository;

    @Override
    public ReservationItem convert(ReservationItemDTO source) {
        ReservationItem reservationItem = new ReservationItem();
        return convert(source, reservationItem);
    }

    @Override
    public ReservationItem convert(ReservationItemDTO source, ReservationItem instance) {
        instance.setNumberOfTickets(source.getNumberOfTickets());
        instance.setPassengerType(source.getPassengerType());
        if (source.getPassengerType().isRequestSeat()) {
            instance.setNumberOfSeats(source.getNumberOfTickets());
        } else {
            instance.setNumberOfSeats(0);
        }
        Optional<Flight> flight = flightRepository.find(source.getFlight());
        if (flight.isPresent()) {
            instance.setFlight(flight.get());
        } else {
            logger.warning(String.format("Flight with ID %d was not found", source.getFlight()));
            throw new NotFoundException("Flight was not found");
        }
        return instance;
    }

}
