package cz.cvut.fel.aeroticket.banner;

import cz.cvut.fel.aeroticket.dto.FlightDTO;
import cz.cvut.fel.aeroticket.service.DestinationService;
import cz.cvut.fel.aeroticket.service.FlightService;
import io.swagger.annotations.Api;

import javax.annotation.PostConstruct;
import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.inject.Inject;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.spi.JsonProvider;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.HashSet;
import java.util.Iterator;

/**
 * Created by TomasNovotny on 28.5.2017.
 */

@Singleton
@Startup
@Path("/banner")
@Api("Banner Controller")
@Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
@Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
public class BannerController {

    @Inject
    private FlightService flightService;

    @Inject
    private DestinationService destinationService;

    private BannerThread bt;

    private  HashSet<Long> idFlights;

    @PostConstruct
    private void startup() {
        System.out.println("PostConstuct WORKS => Thread call start");
        bt=new BannerThread();
        idFlights=new HashSet<>();
        bt.setBc(this);
        bt.start();

    }

    @POST
    @Path("/{id}")
    public Response getFlight(@PathParam("id") Long id) {
        idFlights.add(id);
        return Response.ok(Response.Status.OK).build();
    }


    @DELETE
    @Path("/{id}")
    public Response deleteFlight(@PathParam("id") Long id) {
        idFlights.remove(id);

        return Response.status(Response.Status.OK).build();
    }

    String getFlightsStrings(){
        Iterator<Long> it= idFlights.iterator();

        JsonProvider provider = JsonProvider.provider();
        JsonArrayBuilder arrayBuilder = provider.createArrayBuilder();
        System.out.println("Start processing");


        while(it.hasNext()) {
            Long tmp =it.next();
            try {



                FlightDTO flight = flightService.find(tmp);


                arrayBuilder.add(provider.createObjectBuilder()

                        .add("id", flight.getId())
                        .add("fromDest", destinationService.find(flight.getFrom()).getName())
                        .add("toDest", destinationService.find(flight.getTo()).getName())
                        .add("departureDate", flight.getDateOfDeparture().toString())
                        .add("price", flight.getPrice())
                        .add("freeSeats",flightService.getAvailableSeatsCount(flight.getId()))
                );


            }catch (Exception e){
                System.err.println(e);
                e.printStackTrace();
            }
        }
        JsonArray value = arrayBuilder.build();
        System.out.println("Message is "+value.toString());
        return value.toString();
    }

int getSize(){
    return idFlights.size();
}
}
