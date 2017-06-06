package cz.cvut.fel.aeroticket.validation;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.TYPE, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ReservationCanBeCreatedImpl.class)
public @interface ReservationCanBeCreated {

    String message() default "Error on create";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}
