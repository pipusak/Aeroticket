package cz.cvut.fel.aeroticket.repository;

import cz.cvut.fel.aeroticket.model.ReservationItem;

public interface ReservationItemRepository extends EntityRepository<ReservationItem> {

    Integer getFlightOrderedSeatsCount(Long flightId);

    Integer getReservationOrderedSeatsCount(Long reservationId, Long flightId);

}
