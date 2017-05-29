package cz.cvut.fel.aeroticket.model;

import cz.cvut.fel.aeroticket.reservation.ReservationStatus;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.Set;

@Entity
@Table(name = "RESERVATION", indexes = {
        @Index(columnList = "STATUS")
})
public class Reservation implements Serializable {
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    /*@GeneratedValue(generator = "RESERVATION_SEQ", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "RESERVATION_SEQ", sequenceName = "RESERVATION_SEQ", allocationSize = 1)*/
    @Id
    @Column(name = "ID")
    private Long id;

    @Column(name = "DATE_CREATED", nullable = false)
    private ZonedDateTime created;

    @ManyToOne
    @JoinColumn(name = "CLIENT_ID", nullable = false, referencedColumnName = "ID")
    private Client client;

    @Enumerated(EnumType.STRING)
    @Column(name = "STATUS", nullable = false)
    private ReservationStatus reservationStatus;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "reservation", cascade = CascadeType.ALL)
    private Set<ReservationItem> reservationItems;

    @Column(name = "PRICE", nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getCreated() {
        return created;
    }

    public void setCreated(ZonedDateTime created) {
        this.created = created;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public ReservationStatus getReservationStatus() {
        return reservationStatus;
    }

    public void setReservationStatus(ReservationStatus reservationStatus) {
        this.reservationStatus = reservationStatus;
    }

    public Set<ReservationItem> getReservationItems() {
        return reservationItems;
    }

    public void setReservationItems(Set<ReservationItem> reservationItems) {
        this.reservationItems = reservationItems;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

}
