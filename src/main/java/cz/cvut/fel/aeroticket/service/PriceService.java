package cz.cvut.fel.aeroticket.service;


import cz.cvut.fel.aeroticket.model.Reservation;

import java.math.BigDecimal;

public interface PriceService {

    BigDecimal calculateReservationPrice(Reservation reservation);

}
