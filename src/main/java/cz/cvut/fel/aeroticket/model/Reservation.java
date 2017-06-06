package cz.cvut.fel.aeroticket.model;

import cz.cvut.fel.aeroticket.model.reservation.ReservationStatus;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "RESERVATION", indexes = {
        @Index(columnList = "STATUS")
})
public class Reservation implements Serializable {

    /*@GeneratedValue(generator = "RESERVATION_SEQ", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "RESERVATION_SEQ", sequenceName = "RESERVATION_SEQ", allocationSize = 1)*/
    @Id    @Column(name = "ID")    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;


    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "DATE_CREATED", nullable = false)
    private Date created;

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

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
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
