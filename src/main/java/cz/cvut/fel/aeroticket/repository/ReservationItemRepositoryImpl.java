package cz.cvut.fel.aeroticket.repository;

import cz.cvut.fel.aeroticket.model.ReservationItem;

import javax.ejb.Stateless;
import javax.persistence.TypedQuery;

import static java.lang.Math.toIntExact;

@Stateless
public class ReservationItemRepositoryImpl extends BaseEntityRepository<ReservationItem> implements ReservationItemRepository {

    public ReservationItemRepositoryImpl() {
        super(ReservationItem.class);
    }

    @Override
    public Integer getFlightOrderedSeatsCount(Long flightId) {
        TypedQuery<Long> query = entityManager
                .createNamedQuery("flightOrderedSeats", Long.class)
                .setParameter("flightId", flightId);
        return toIntExact(query.getSingleResult());
    }

    @Override
    public Integer getReservationOrderedSeatsCount(Long reservationId, Long flightId) {
        TypedQuery<Integer> query = entityManager
                .createNamedQuery("reservationFlightOrderedSeats", Integer.class)
                .setParameter("reservationId", reservationId)
                .setParameter("flightId", flightId);
        return query.getSingleResult();
    }
}
