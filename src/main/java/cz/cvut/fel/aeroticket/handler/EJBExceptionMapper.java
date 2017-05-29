package cz.cvut.fel.aeroticket.handler;

import cz.cvut.fel.aeroticket.dto.ErrorDTO;

import javax.ejb.EJBException;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class EJBExceptionMapper implements ExceptionMapper<EJBException> {

    @Override
    public Response toResponse(EJBException exception) {
        if (exception.getCause().getClass().equals(NotFoundException.class)) {
            return Response.status(Response.Status.NOT_FOUND).build();
        } else {
            ErrorDTO errorDTO = new ErrorDTO();
            errorDTO.addError(exception.getLocalizedMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(errorDTO).build();
        }
    }

}
