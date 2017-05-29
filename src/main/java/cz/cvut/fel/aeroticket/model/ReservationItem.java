package cz.cvut.fel.aeroticket.model;

import cz.cvut.fel.aeroticket.reservation.PassengerType;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name = "RESERVATION_ITEM", indexes = {
        @Index(columnList = "PASSENGER_TYPE")
})
@NamedQueries({
        @NamedQuery(name = "flightOrderedSeats", query = "select sum(ri.numberOfSeats) from ReservationItem ri where ri.flight.id = :flightId"),
        @NamedQuery(name = "reservationFlightOrderedSeats", query = "select sum(ri.numberOfSeats) from ReservationItem ri where ri.reservation.id = :reservationId and ri.flight.id = :flightId")
})
public class ReservationItem implements Serializable {
    @GeneratedValue( strategy = GenerationType.IDENTITY)
/*    @GeneratedValue(generator = "RESERVATION_ITEM_SEQ", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "RESERVATION_ITEM_SEQ", sequenceName = "RESERVATION_ITEM_SEQ", allocationSize = 1)*/
    @Id
    @Column(name = "ID")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "PASSENGER_TYPE", nullable = false)
    private PassengerType passengerType;

    @Column(name = "NUMBER_OF_SEATS", nullable = false)
    private Integer numberOfSeats;

    @Column(name = "NUMBER_OF_TICKETS", nullable = false)
    private Integer numberOfTickets;

    @ManyToOne
    @JoinColumn(name = "FLIGHT_ID", nullable = false, referencedColumnName = "ID")
    private Flight flight;

    @ManyToOne
    @JoinColumn(name = "RESERVATION_ID", nullable = false, referencedColumnName = "ID")
    private Reservation reservation;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PassengerType getPassengerType() {
        return passengerType;
    }

    public void setPassengerType(PassengerType passengerType) {
        this.passengerType = passengerType;
    }

    public Integer getNumberOfSeats() {
        return numberOfSeats;
    }

    public void setNumberOfSeats(Integer numberOfSeats) {
        this.numberOfSeats = numberOfSeats;
    }

    public Flight getFlight() {
        return flight;
    }

    public void setFlight(Flight flight) {
        this.flight = flight;
    }

    public Reservation getReservation() {
        return reservation;
    }

    public void setReservation(Reservation reservation) {
        this.reservation = reservation;
    }

    public Integer getNumberOfTickets() {
        return numberOfTickets;
    }

    public void setNumberOfTickets(Integer numberOfTickets) {
        this.numberOfTickets = numberOfTickets;
    }
}
