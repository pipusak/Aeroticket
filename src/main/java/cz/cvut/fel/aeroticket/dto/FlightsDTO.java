package cz.cvut.fel.aeroticket.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.List;

@XmlRootElement(name = "flights")
@XmlAccessorType(XmlAccessType.FIELD)
public class FlightsDTO extends BaseDTOContainer<FlightDTO> {

    @XmlElement(name = "flight")
    @JsonProperty("flights")
    private List<FlightDTO> flights;

    public List<FlightDTO> getFlights() {
        return flights;
    }

    public void setFlights(List<FlightDTO> flights) {
        this.flights = flights;
    }

}
