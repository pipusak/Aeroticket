package cz.cvut.fel.aeroticket.handler;

import cz.cvut.fel.aeroticket.dto.ErrorDTO;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class CommonExceptionMapper implements ExceptionMapper<Exception> {

    @Override
    public Response toResponse(Exception exception) {
        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.addError(exception.getLocalizedMessage());
        return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(errorDTO).build();
    }

}
