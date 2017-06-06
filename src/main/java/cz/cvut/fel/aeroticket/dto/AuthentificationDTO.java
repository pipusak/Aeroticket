package cz.cvut.fel.aeroticket.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import org.hibernate.validator.constraints.Email;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Created by TomasNovotny on 6.6.2017.
 */


@XmlRootElement(name = "authentification")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AuthentificationDTO {


    private Long id;

    private String role;

    @Email
    private String email;

    @Size(min = 3)
    private String password;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
