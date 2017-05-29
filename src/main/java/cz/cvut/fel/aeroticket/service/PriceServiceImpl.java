package cz.cvut.fel.aeroticket.service;

import cz.cvut.fel.aeroticket.model.Destination;
import cz.cvut.fel.aeroticket.model.Reservation;
import cz.cvut.fel.aeroticket.model.ReservationItem;
import cz.cvut.fel.aeroticket.reservation.PassengerType;

import javax.ejb.Stateless;
import java.math.BigDecimal;
import java.util.Optional;
import java.util.Set;

@Stateless
public class PriceServiceImpl implements PriceService {

    private final static BigDecimal RETURN_TICKET_COEFFICIENT = BigDecimal.valueOf(0.85);

    @Override
    public BigDecimal calculateReservationPrice(Reservation reservation) {
        BigDecimal price = BigDecimal.ZERO;
        for (ReservationItem reservationItem : reservation.getReservationItems())
            price = price.add(getOneReservationItemPrice(reservationItem, reservation.getReservationItems()));
        return price;
    }

    private BigDecimal getOneReservationItemPrice(ReservationItem reservationItem, Set<ReservationItem> reservationItems) {
        BigDecimal price = BigDecimal.ZERO;
        Integer returnTickets = countOfReturnTickets(reservationItem.getFlight().getFrom(), reservationItem.getFlight().getTo(), reservationItem.getPassengerType(), reservationItems);
        BigDecimal oneTicketPrice = getOneTicketPrice(reservationItem);
        Integer returnTicketsCount = reservationItem.getNumberOfSeats() - returnTickets;
        if (reservationItem.getNumberOfSeats() <= returnTickets) {
            price = price.add(oneTicketPrice.multiply(BigDecimal.valueOf(reservationItem.getNumberOfSeats())).multiply(RETURN_TICKET_COEFFICIENT));
        } else {
            price = price.add(oneTicketPrice.multiply(BigDecimal.valueOf(returnTickets)).multiply(RETURN_TICKET_COEFFICIENT));
            price = price.add(oneTicketPrice.multiply(BigDecimal.valueOf(returnTicketsCount)));
        }
        return price;
    }

    private BigDecimal getOneTicketPrice(ReservationItem reservationItem) {
        return reservationItem.getFlight().getPrice()
                .multiply(BigDecimal.valueOf(1 - reservationItem.getPassengerType().getSale()));
    }

    private Integer countOfReturnTickets(Destination from, Destination to, PassengerType passengerType, Set<ReservationItem> reservationItems) {
        Optional<ReservationItem> returnItem = reservationItems
                .stream()
                .filter(reservationItem -> reservationItem.getFlight().getFrom().equals(to))
                .filter(reservationItem -> reservationItem.getFlight().getTo().equals(from))
                .filter(reservationItem -> reservationItem.getPassengerType().equals(passengerType))
                .findFirst();
        return returnItem.map(ReservationItem::getNumberOfSeats).orElse(0);
    }

}
