package cz.cvut.fel.aeroticket.validation;

import cz.cvut.fel.aeroticket.dto.ReservationDTO;
import cz.cvut.fel.aeroticket.validation.dto.ValidationResult;

import javax.ejb.Singleton;
import javax.inject.Inject;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

@Singleton
public class ReservationCanBeCreatedImpl implements ConstraintValidator<ReservationCanBeCreated, ReservationDTO> {

    @Inject
    private ReservationValidator reservationValidator;

    @Override
    public void initialize(ReservationCanBeCreated constraintAnnotation) {

    }

    @Override
    public boolean isValid(ReservationDTO value, ConstraintValidatorContext context) {
        ValidationResult validationResult = reservationValidator.canBeCreated(value);
        if (!validationResult.isValid()) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(validationResult.getMessage());
            return false;
        }
        return true;
    }

}
