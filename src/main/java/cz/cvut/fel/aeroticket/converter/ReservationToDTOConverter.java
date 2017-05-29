package cz.cvut.fel.aeroticket.converter;

import cz.cvut.fel.aeroticket.dto.ReservationDTO;
import cz.cvut.fel.aeroticket.dto.ReservationItemDTO;
import cz.cvut.fel.aeroticket.model.Reservation;
import cz.cvut.fel.aeroticket.model.ReservationItem;

import javax.ejb.Singleton;
import javax.inject.Inject;
import java.util.stream.Collectors;

@Singleton
public class ReservationToDTOConverter implements Converter<Reservation, ReservationDTO> {

    @Inject
    private Converter<ReservationItem, ReservationItemDTO> reservationItemDTOConverter;

    @Override
    public ReservationDTO convert(Reservation source) {
        ReservationDTO reservationDTO = new ReservationDTO();
        return convert(source, reservationDTO);
    }

    @Override
    public ReservationDTO convert(Reservation source, ReservationDTO instance) {
        instance.setId(source.getId());
        instance.setCreated(source.getCreated());
        instance.setReservationStatus(source.getReservationStatus());
        instance.setClient(source.getClient().getId());
        instance.setPrice(source.getPrice().doubleValue());
        instance.setReservationItems(
                source
                        .getReservationItems()
                        .stream()
                        .map(reservationItemDTOConverter::convert)
                        .collect(Collectors.toSet()));
        return instance;
    }

}
