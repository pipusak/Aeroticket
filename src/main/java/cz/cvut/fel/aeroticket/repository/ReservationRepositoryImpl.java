package cz.cvut.fel.aeroticket.repository;

import cz.cvut.fel.aeroticket.model.Reservation;
import cz.cvut.fel.aeroticket.model.ReservationItem;

import javax.ejb.Stateless;
import java.sql.SQLOutput;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

@Stateless
public class ReservationRepositoryImpl extends BaseEntityRepository<Reservation> implements ReservationRepository {

    public ReservationRepositoryImpl() {
        super(Reservation.class);
    }

    @Override
    public Reservation save(Reservation entity) {
        Set<ReservationItem> reservationItems= entity.getReservationItems();
        entity.setReservationItems(new HashSet<ReservationItem>());
        Reservation result = entityManager.merge(entity);

        Long id = result.getId();
        Iterator<ReservationItem> it=reservationItems.iterator();

        while(it.hasNext()){
            it.next().setReservation(result);
        }
        result.setReservationItems(reservationItems);
        result = entityManager.merge(result);
        return result;
    }
}
