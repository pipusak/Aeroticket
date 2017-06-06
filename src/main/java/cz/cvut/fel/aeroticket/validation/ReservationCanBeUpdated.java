package cz.cvut.fel.aeroticket.validation;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.TYPE, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ReservationCanBeUpdatedImpl.class)
public @interface ReservationCanBeUpdated {

    String message() default "Error on update";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}
