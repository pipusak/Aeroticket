package cz.cvut.fel.aeroticket.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import cz.cvut.fel.aeroticket.model.reservation.ReservationStatus;
import cz.cvut.fel.aeroticket.validation.ReservationCanBeCreated;
import cz.cvut.fel.aeroticket.validation.ReservationCanBeUpdated;
import cz.cvut.fel.aeroticket.validation.groups.ValidateOnCreate;
import cz.cvut.fel.aeroticket.validation.groups.ValidateOnUpdate;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.Date;
import java.util.Set;

@XmlRootElement(name = "reservation")
@XmlAccessorType(XmlAccessType.FIELD)
@ReservationCanBeCreated(groups = ValidateOnCreate.class)
@ReservationCanBeUpdated(groups = ValidateOnUpdate.class)
@JsonInclude(JsonInclude.Include.NON_NULL)
@ApiModel
public class ReservationDTO {

    private Long id;

    private Long client;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSZ")
    @ApiModelProperty(dataType = "java.lang.String", example = "yyyy-MM-dd'T'HH:mm:ss.SSSZ")
    private Date created;

    private ReservationStatus reservationStatus;

    @XmlElement(name = "reservationItems")
    @JsonProperty("reservationItems")
    @Size(min = 1)
    private Set<ReservationItemDTO> reservationItems;

    private Double price;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getClient() {
        return client;
    }

    public void setClient(Long client) {
        this.client = client;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public ReservationStatus getReservationStatus() {
        return reservationStatus;
    }

    public void setReservationStatus(ReservationStatus reservationStatus) {
        this.reservationStatus = reservationStatus;
    }

    public Set<ReservationItemDTO> getReservationItems() {
        return reservationItems;
    }

    public void setReservationItems(Set<ReservationItemDTO> reservationItems) {
        this.reservationItems = reservationItems;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}
