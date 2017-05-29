package cz.cvut.fel.aeroticket.websocket;

import com.fasterxml.jackson.core.JsonProcessingException;
import java.io.IOException;
import java.io.StringReader;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

/**
 *
 * @author dan
 */
@ApplicationScoped
@ServerEndpoint("/flights")
public class FlightWebSocketServer {
    
    @Inject //accept zero or more dependencies as arguments
    private FlightSessionHandler sessionHandler;
    
    @OnOpen
    public void open(Session session) {
        sessionHandler.addSession(session);
    }
    
    @OnMessage
    public void processMessage(String message, Session session) throws JsonProcessingException{
        try (JsonReader reader = Json.createReader(new StringReader(message))) {
            JsonObject jsonMessage = reader.readObject();
            
            if ("getFlights".equals(jsonMessage.getString("action"))) {

                Integer topint = 5;
                //send flight list to client
                try{
                String top = jsonMessage.getString("top");


                    topint = Integer.parseInt(top);
                }catch(Exception ex){
                //top neobsahuje numerickou hodnotu - defaultni hodnota je 5
                }
                
                //jedenkrat se na klienta poslou data rovnou
                sessionHandler.createFlightListMessage(session, topint);
                
                //a pak se v pravidelnem intervalu budou posilat z noveho vlakna
                //Concurrency: pouzil jsem ExecutorService z prednaskovych slajdu, lze resit i pomoci Threadu - viz nize
                ExecutorService executorService = Executors.newSingleThreadExecutor();                
                executorService.execute(new WebSocketThread(sessionHandler, topint, session));
                
                //klasicky Thread je taky mozno pouzit - ponechavam zakomentovane 
                /*
                Thread t = new Thread(new WebSocketThread(sessionHandler, topint, session));
                t.start();
                if(t.isAlive()){
                    try {
                        t.join(10000);
                        //t.interrupt();
                    } catch (InterruptedException ex) {
                        Logger.getLogger(FlightWebSocketServer.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                */
            }
            
        }
    }
    
    @OnClose
        public void close(Session session) {
        try {
            session.close();
        } catch (IOException ex) {
            Logger.getLogger(FlightWebSocketServer.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        sessionHandler.removeSession(session);
    }
    
}
