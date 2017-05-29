package cz.cvut.fel.aeroticket.controller;

import cz.cvut.fel.aeroticket.dto.DTOContainer;
import cz.cvut.fel.aeroticket.dto.FlightDTO;
import cz.cvut.fel.aeroticket.filter.Filter;
import cz.cvut.fel.aeroticket.service.FlightService;
import io.swagger.annotations.Api;

import javax.inject.Inject;
import javax.validation.Valid;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


@Path("/flight")
@Api("Flight Controller")
@Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
@Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
public class FlightController {

    @Inject
    private FlightService flightService;

    @GET
    public Response getFlights(@QueryParam("page") @DefaultValue("-1") int page,
                               @QueryParam("orderBy") @DefaultValue("id") String orderBy,
                               @QueryParam("order") @DefaultValue("asc") String order) {
        DTOContainer<FlightDTO> result = flightService.find(Filter
                .getBuilder()
                .page(page)
                .order(order)
                .orderBy(orderBy)
                .build());
        return Response.ok(result).build();
    }

    @GET
    @Path("/{id}")
    public Response getFlight(@PathParam("id") Long id) {
        FlightDTO result = flightService.find(id);
        return Response.ok(result).build();
    }

    @POST
    public Response createFlight(@Valid FlightDTO flightDTO) {
        FlightDTO result = flightService.save(flightDTO);
        return Response.status(Response.Status.CREATED)
                .entity(result)
                .build();
    }

    @PUT
    @Path("/{id}")
    public Response updateFlight(@PathParam("id") Long id, @Valid FlightDTO flightDTO) {
        FlightDTO result = flightService.update(id, flightDTO);
        return Response.ok(result).build();
    }


    @DELETE
    @Path("/{id}")
    public Response deleteFlight(@PathParam("id") Long id) {
        flightService.delete(id);
        return Response.status(Response.Status.OK).build();
    }

}
