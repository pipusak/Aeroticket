package cz.cvut.fel.aeroticket.model;

import cz.cvut.fel.aeroticket.model.client.Role;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "CLIENT", indexes = {
@Index(columnList = "EMAIL")
})

@NamedQueries({
        @NamedQuery(name = "clientByEmail", query = "select client from Client client where client.email = :email"),
        })
public class Client implements Serializable {

/*    @GeneratedValue(generator = "CLIENT_SEQ", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "CLIENT_SEQ", sequenceName = "CLIENT_SEQ", allocationSize = 1)*/
    @Id
    @Column(name = "ID")
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "EMAIL", nullable = false, unique = true)
    private String email;

    @Column(name = "FIRST_NAME", nullable = false)
    private String firstName;

    @Column(name = "LAST_NAME", nullable = false)
    private String lastName;

    @Column(name = "DATE_OF_BIRTH", nullable = false)
    private LocalDate dateOfBirth;

    @Column(name = "KILOMETERS", nullable = false)
    private Long kilometers = 0L;

    @Column(name = "PASSWORD", nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "ROLE", nullable = false)
    private Role role;

    @OneToMany(mappedBy = "client",cascade= CascadeType.REMOVE)
    private Set<Reservation> reservations;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public Long getKilometers() {
        return kilometers;
    }

    public void setKilometers(Long kilometers) {
        this.kilometers = kilometers;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Reservation> getReservations() {
        return reservations;
    }

    public void setReservations(Set<Reservation> reservations) {
        this.reservations = reservations;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
