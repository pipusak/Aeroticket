package cz.cvut.fel.aeroticket.handler;

import cz.cvut.fel.aeroticket.dto.ErrorDTO;
import org.hibernate.exception.ConstraintViolationException;

import javax.ejb.EJBTransactionRolledbackException;
import javax.persistence.PersistenceException;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class EJBTransactionRollbackExceptionMapper implements ExceptionMapper<EJBTransactionRolledbackException> {

    @Override
    public Response toResponse(EJBTransactionRolledbackException exception) {
        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.addError(getErrorMessage(exception));
        return Response.status(Response.Status.BAD_REQUEST).entity(errorDTO).build();
    }

    private String getErrorMessage(EJBTransactionRolledbackException exception) {
        if (isCausedByPersistenceException(exception)) {
            return getPersistenceExceptionMessage(getPersistenceException(exception));
        } else {
            return exception.getLocalizedMessage();
        }
    }

    private String getPersistenceExceptionMessage(PersistenceException exception) {
        if (exception.getCause().getClass().equals(ConstraintViolationException.class)) {
            ConstraintViolationException constraintViolationException = (ConstraintViolationException) exception.getCause();
            return "Constraint violation " + constraintViolationException.getLocalizedMessage();
        } else {
            return exception.getLocalizedMessage();
        }
    }

    private PersistenceException getPersistenceException(EJBTransactionRolledbackException exception) {
        return (PersistenceException) exception.getCause().getCause();
    }

    private boolean isCausedByPersistenceException(EJBTransactionRolledbackException exception) {
        return exception.getCause().getCause().getClass().equals(PersistenceException.class);
    }

}
