package cz.cvut.fel.aeroticket.controller;

import cz.cvut.fel.aeroticket.dto.AuthentificationDTO;
import cz.cvut.fel.aeroticket.dto.ClientDTO;
import cz.cvut.fel.aeroticket.service.ClientService;
import io.swagger.annotations.Api;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * Created by TomasNovotny on 6.6.2017.
 */

@Path("/authentification")
@Api("Authentification Controller")
@Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
@Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
public class AuthentificationController {


    @Inject
    private ClientService clientService;


    @GET
    public Response authentificate(AuthentificationDTO authentification) {

        ClientDTO client = clientService.getClientByEmail(authentification.getEmail());

        AuthentificationDTO result = new AuthentificationDTO();
        result.setRole(client.getRole());
        result.setId(client.getId());


        if(authentification.getPassword().equals(client.getPassword())){

            return Response.ok(result).build();
        }

        return Response.status(Response.Status.FORBIDDEN).build();
    }
}
