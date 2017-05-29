package cz.cvut.fel.aeroticket.handler;

import cz.cvut.fel.aeroticket.dto.ErrorDTO;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.validation.Path;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;
import java.util.Iterator;
import java.util.stream.Collectors;

@Provider
public class ConstraintViolationExceptionMapper implements ExceptionMapper<ConstraintViolationException> {

    @Override
    public Response toResponse(ConstraintViolationException exception) {
        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setErrors(exception
                .getConstraintViolations()
                .stream()
                .map(this::getErrorMessage)
                .collect(Collectors.toSet()));
        return Response.status(Response.Status.BAD_REQUEST).entity(errorDTO).build();
    }

    private String getErrorMessage(ConstraintViolation<?> constraintViolation) {
        return String.format("%s %s", getPropertyViolation(constraintViolation.getPropertyPath()), constraintViolation.getMessage());
    }

    private String getPropertyViolation(Path path) {
        Iterator<Path.Node> pathIterator = path.iterator();
        Path.Node leafNode = pathIterator.next();
        while (pathIterator.hasNext()) leafNode = pathIterator.next();
        return leafNode.getName();
    }

}
