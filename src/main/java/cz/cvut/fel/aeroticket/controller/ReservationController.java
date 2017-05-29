package cz.cvut.fel.aeroticket.controller;

import cz.cvut.fel.aeroticket.dto.DTOContainer;
import cz.cvut.fel.aeroticket.dto.ReservationDTO;
import cz.cvut.fel.aeroticket.filter.Filter;
import cz.cvut.fel.aeroticket.service.ReservationService;
import cz.cvut.fel.aeroticket.validation.ReservationCanBeCreated;
import cz.cvut.fel.aeroticket.validation.ReservationCanBeUpdated;
import io.swagger.annotations.Api;

import javax.inject.Inject;
import javax.validation.Valid;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/reservation")
@Api("Reservation Controller")
@Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
@Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
public class ReservationController {

    @Inject
    private ReservationService reservationService;

    @GET
    public Response getReservations(@QueryParam("page") @DefaultValue("-1") int page,
                                    @QueryParam("orderBy") @DefaultValue("id") String orderBy,
                                    @QueryParam("order") @DefaultValue("asc") String order) {
        DTOContainer<ReservationDTO> result = reservationService.find(Filter
                .getBuilder()
                .page(page)
                .order(order)
                .orderBy(orderBy)
                .build());
        return Response.ok(result).build();
    }

    @GET
    @Path("/{id}")
    public Response getReservation(@PathParam("id") Long id) {
        ReservationDTO result = reservationService.find(id);
        return Response.ok(result).build();
    }

    @POST
    public Response createReservation(@Valid @ReservationCanBeCreated ReservationDTO reservationDTO) {
        ReservationDTO result = reservationService.save(reservationDTO);
        return Response.status(Response.Status.CREATED)
                .entity(result)
                .build();
    }

    @PUT
    @Path("/{id}")
    public Response updateReservation(@PathParam("id") Long id, @Valid @ReservationCanBeUpdated ReservationDTO reservationDTO) {
        ReservationDTO result = reservationService.update(id, reservationDTO);
        return Response.ok(result).build();
    }

    @DELETE
    @Path("/{id}")
    public Response deleteReservation(@PathParam("id") Long id) {
        reservationService.delete(id);
        return Response.status(Response.Status.OK).build();
    }
}
