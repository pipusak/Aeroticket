package cz.cvut.fel.aeroticket.controller;

import cz.cvut.fel.aeroticket.dto.DTOContainer;
import cz.cvut.fel.aeroticket.dto.DestinationDTO;
import cz.cvut.fel.aeroticket.filter.Filter;
import cz.cvut.fel.aeroticket.service.DestinationService;
import io.swagger.annotations.Api;

import javax.inject.Inject;
import javax.validation.Valid;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/destination")
@Api("Destination Controller")
@Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
@Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
public class DestinationController {

    @Inject
    private DestinationService destinationService;

    @GET
    public Response getDestinations(@QueryParam("page") @DefaultValue("-1") int page,
                                    @QueryParam("orderBy") @DefaultValue("id") String orderBy,
                                    @QueryParam("order") @DefaultValue("asc") String order) {
        DTOContainer<DestinationDTO> result = destinationService.find(Filter
                .getBuilder()
                .page(page)
                .order(order)
                .orderBy(orderBy)
                .build());
        return Response.ok(result).build();
    }


    @GET
    @Path("/{id}")
    public Response getDestination(@PathParam("id") Long id) {
        DestinationDTO result = destinationService.find(id);
        return Response.ok(result).build();
    }

    @POST
    public Response createDestination(@Valid DestinationDTO destinationDTO) {
        DestinationDTO result = destinationService.save(destinationDTO);
        return Response.status(Response.Status.CREATED)
                .entity(result)
                .build();
    }

    @PUT
    @Path("/{id}")
    public Response updateDestination(@PathParam("id") Long id, @Valid DestinationDTO destinationDTO) {
        DestinationDTO result = destinationService.update(id, destinationDTO);
        return Response.ok(result).build();
    }

    @DELETE
    @Path("/{id}")
    public Response deleteDestination(@PathParam("id") Long id) {
        destinationService.delete(id);
        return Response.status(Response.Status.OK).build();
    }
}
