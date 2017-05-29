package cz.cvut.fel.aeroticket.repository;

import cz.cvut.fel.aeroticket.model.Reservation;

import javax.ejb.Stateless;

@Stateless
public class ReservationRepositoryImpl extends BaseEntityRepository<Reservation> implements ReservationRepository {

    public ReservationRepositoryImpl() {
        super(Reservation.class);
    }

}
