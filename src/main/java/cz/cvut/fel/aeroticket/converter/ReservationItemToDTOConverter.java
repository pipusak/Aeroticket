package cz.cvut.fel.aeroticket.converter;

import cz.cvut.fel.aeroticket.dto.ReservationItemDTO;
import cz.cvut.fel.aeroticket.model.ReservationItem;

import javax.ejb.Singleton;

@Singleton
public class ReservationItemToDTOConverter implements Converter<ReservationItem, ReservationItemDTO> {

    @Override
    public ReservationItemDTO convert(ReservationItem source) {
        ReservationItemDTO reservationItemDTO = new ReservationItemDTO();
        return convert(source, reservationItemDTO);
    }

    @Override
    public ReservationItemDTO convert(ReservationItem source, ReservationItemDTO instance) {
        instance.setNumberOfTickets(source.getNumberOfTickets());
        instance.setPassengerType(source.getPassengerType());
        instance.setFlight(source.getFlight().getId());
        return instance;
    }

}
