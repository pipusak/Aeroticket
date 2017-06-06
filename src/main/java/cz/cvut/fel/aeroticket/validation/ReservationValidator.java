package cz.cvut.fel.aeroticket.validation;


import cz.cvut.fel.aeroticket.dto.ReservationDTO;
import cz.cvut.fel.aeroticket.validation.dto.ValidationResult;

public interface ReservationValidator {

    ValidationResult canBeCreated(ReservationDTO reservationDTO);

    ValidationResult canBeUpdated(ReservationDTO reservationDTO);

//    ValidationResult canBeDeleted(ReservationDTO reservationDTO);

}
