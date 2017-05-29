package cz.cvut.fel.aeroticket.websocket;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import cz.cvut.fel.aeroticket.dto.DTOContainer;
import cz.cvut.fel.aeroticket.dto.FlightDTO;
import cz.cvut.fel.aeroticket.dto.FlightsDTO;
import cz.cvut.fel.aeroticket.filter.Filter;
import cz.cvut.fel.aeroticket.service.FlightService;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.websocket.Session;
import java.io.IOException;
import java.util.HashSet;
import java.util.Hashtable;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.spi.JsonProvider;

/**
 * @author dan
 */
@ApplicationScoped
public class FlightSessionHandler {

    private final static Logger logger = Logger.getLogger(FlightSessionHandler.class.getName());

    @Inject
    private FlightService flightService;

    private final Filter filter;
    private final Set<Session> sessions = new HashSet<>();

    public FlightSessionHandler() {
        filter = getLatestFlightsFilter();
    }

    public void addSession(Session session) {
        sessions.add(session);
    }

    public void removeSession(Session session) {
        sessions.remove(session);
    }

    public void createFlightListMessage(Session session, int topint) throws JsonProcessingException {

        DTOContainer<FlightDTO> flights2 = flightService.find(filter);
        String jsonFlights = new ObjectMapper()
                .writerFor(FlightsDTO.class)
                .writeValueAsString(flights2);


        Hashtable<Integer, FlightWSocket> flights = new Hashtable<>();
        //TODO - vytahnout z databaze nasledujici data: id, fromDest, toDest, departureTime, departureDate, price
        //klic (key v hashtable) ve flights je taky  id
        //ten FlightDTO tam ma "from" a "to" jako nejake hodnoty typu Long, na klientovi potrebujeme zobrazit odkud kam leti, tj. Stringy       


        //tohle odstranit
        FlightWSocket f1 = new FlightWSocket(1, "Prague", "London", "15:30", "10.1.2017", "120");
        FlightWSocket f2 = new FlightWSocket(2, "Prague", "Berlin", "16:15", "10.1.2017", "95");
        FlightWSocket f3 = new FlightWSocket(3, "Prague", "Milan", "17:00", "10.1.2017", "85");
        if (!flights.containsKey(f1.getId()))
            flights.put(f1.getId(), f1);
        if (!flights.containsKey(f2.getId()))
            flights.put(f2.getId(), f2);
        if (!flights.containsKey(f3.getId()))
            flights.put(f3.getId(), f3);

        JsonProvider provider = JsonProvider.provider();
        JsonArrayBuilder arrayBuilder = provider.createArrayBuilder();

        Set<Integer> keys = flights.keySet();
        //chceme vratit max pocet zaznamu pozadovanych na klientovi
        int counter = 0;
        for (Integer key : keys) {
            if (counter >= topint)
                break;
            FlightWSocket flight = flights.get(key);
            arrayBuilder.add(provider.createObjectBuilder()
                    //objectBuilder.add("flight" + flight.getId(), provider.createObjectBuilder()
                    .add("id", flight.getId())
                    .add("fromDest", flight.getFromDest())
                    .add("toDest", flight.getToDest())
                    .add("departureTime", flight.getDepartureTime())
                    .add("departureDate", flight.getDepartureDate())
                    .add("price", flight.getPrice()));

            counter++;
        }
        JsonArray value = arrayBuilder.build();
        sendToSession(session, value);
    }

    private void sendToSession(Session session, JsonArray message) {
        try {
            session.getBasicRemote().sendText(message.toString());
        } catch (IOException ex) {
            sessions.remove(session);
            logger.log(Level.SEVERE, null, ex);
        }
    }

    private Filter getLatestFlightsFilter() {
        Filter filter = new Filter();
        filter.setOrder("desc");
        filter.setOrderBy("dateOfDeparture");
        filter.setPage(0);
        return filter;
    }

}