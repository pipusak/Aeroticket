package cz.cvut.fel.aeroticket.dto;


import com.fasterxml.jackson.annotation.JsonProperty;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.List;

@XmlRootElement(name = "destinations")
@XmlAccessorType(XmlAccessType.FIELD)
public class DestinationsDTO extends BaseDTOContainer<DestinationDTO> {

    @XmlElement(name = "destination")
    @JsonProperty("destinations")
    private List<DestinationDTO> destinationDTOs;

    public List<DestinationDTO> getDestinationDTOs() {
        return destinationDTOs;
    }

    public void setDestinationDTOs(List<DestinationDTO> destinationDTOs) {
        this.destinationDTOs = destinationDTOs;
    }

}
