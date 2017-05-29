package cz.cvut.fel.aeroticket.service;

import cz.cvut.fel.aeroticket.dto.ReservationDTO;
import cz.cvut.fel.aeroticket.model.Reservation;

public interface ReservationService extends EntityService<Reservation, ReservationDTO> {

    Integer getAvailableSeatsCount(Long flightId, Long reservationId);

}
