package cz.cvut.fel.aeroticket.converter;

import cz.cvut.fel.aeroticket.dto.ReservationDTO;
import cz.cvut.fel.aeroticket.dto.ReservationItemDTO;
import cz.cvut.fel.aeroticket.model.Reservation;
import cz.cvut.fel.aeroticket.model.ReservationItem;

import javax.ejb.Singleton;
import javax.inject.Inject;
import java.util.stream.Collectors;

@Singleton
public class ReservationDTOToModelConverter implements Converter<ReservationDTO, Reservation> {

    @Inject
    private Converter<ReservationItemDTO, ReservationItem> reservationItemConverter;

    @Override
    public Reservation convert(ReservationDTO source) {
        Reservation reservation = new Reservation();
        return convert(source, reservation);
    }

    @Override
    public Reservation convert(ReservationDTO source, Reservation instance) {
        instance.setReservationStatus(source.getReservationStatus());
        instance.setReservationItems(
                source
                        .getReservationItems()
                        .stream()
                        .map(reservationItemConverter::convert)
                        .collect(Collectors.toSet()));
        return instance;
    }

}
