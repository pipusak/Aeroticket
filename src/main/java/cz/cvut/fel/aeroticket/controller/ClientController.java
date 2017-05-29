package cz.cvut.fel.aeroticket.controller;

import cz.cvut.fel.aeroticket.dto.ClientDTO;
import cz.cvut.fel.aeroticket.dto.DTOContainer;
import cz.cvut.fel.aeroticket.filter.Filter;
import cz.cvut.fel.aeroticket.service.ClientService;
import io.swagger.annotations.Api;

import javax.inject.Inject;
import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/client")
@Api("Client Controller")
@Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
@Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
public class ClientController {

    @Inject
    private ClientService clientService;

    @GET
    public Response getClients(@QueryParam("page") @DefaultValue("-1") int page,
                               @QueryParam("orderBy") @DefaultValue("id") String orderBy,
                               @QueryParam("order") @DefaultValue("asc") String order) {
        DTOContainer<ClientDTO> result = clientService.find(Filter
                .getBuilder()
                .page(page)
                .order(order)
                .orderBy(orderBy)
                .build());
        return Response.ok(result).build();
    }


    @GET
    @Path("/{id}")
    public Response getClient(@PathParam("id") Long id) {
        ClientDTO result = clientService.find(id);
        return Response.ok(result).build();
    }

    @POST
    public Response createClient(@Valid ClientDTO clientDTO) {
        ClientDTO result = clientService.save(clientDTO);
        return Response.status(Response.Status.CREATED)
                .entity(result)
                .build();
    }

    @PUT
    @Path("/{id}")
    public Response updateClient(@PathParam("id") Long id, @Valid ClientDTO clientDTO) {
        ClientDTO result = clientService.update(id, clientDTO);
        return Response.ok(result).build();
    }

    @DELETE
    @Path("/{id}")
    public Response deleteClient(@PathParam("id") Long id) {
        clientService.delete(id);
        return Response.status(Response.Status.OK).build();
    }

}
