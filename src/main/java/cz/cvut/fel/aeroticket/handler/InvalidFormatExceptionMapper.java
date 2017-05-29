package cz.cvut.fel.aeroticket.handler;

import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import cz.cvut.fel.aeroticket.dto.ErrorDTO;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class InvalidFormatExceptionMapper implements ExceptionMapper<InvalidFormatException> {

    @Override
    public Response toResponse(InvalidFormatException exception) {
        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.addError(exception.getOriginalMessage());
        return Response.status(Response.Status.BAD_REQUEST).entity(errorDTO).build();
    }

}
