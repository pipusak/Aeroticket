package cz.cvut.fel.aeroticket.dto;

import cz.cvut.fel.aeroticket.reservation.PassengerType;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "reservationItem")
public class ReservationItemDTO {

    @NotNull
    private PassengerType passengerType;

    @NotNull
    @Min(1)
    private Integer numberOfTickets;

    @NotNull
    private Long flight;

    public PassengerType getPassengerType() {
        return passengerType;
    }

    public void setPassengerType(PassengerType passengerType) {
        this.passengerType = passengerType;
    }

    public Long getFlight() {
        return flight;
    }

    public void setFlight(Long flight) {
        this.flight = flight;
    }

    public Integer getNumberOfTickets() {
        return numberOfTickets;
    }

    public void setNumberOfTickets(Integer numberOfTickets) {
        this.numberOfTickets = numberOfTickets;
    }
}
