package cz.cvut.fel.aeroticket.websocket;

import javax.websocket.Session;

/**
 *
 * @author dan
 */
public class WebSocketThread implements Runnable {
    private FlightSessionHandler fsh;
    private Session session;
    private Integer topint;
    
    public WebSocketThread(FlightSessionHandler fsh, Integer topint, Session session){
        this.fsh = fsh;
        this.session = session;
        this.topint = topint;
    }
    
    public void run(){      
        
        while(session.isOpen()){
            try {
                //co pet sekund se poslou data na klienta (v praxi to bude spis tak co 15 sekund)
                Thread.sleep(5000);
                fsh.createFlightListMessage(session, topint);
                
            } catch (InterruptedException ex) {
                //konec vlakna je mozno volat explicitne
                System.out.println("koncim 2 - explicitni interrupt");
                return;
            } catch(Exception e){
            }
        }
        System.out.println("koncim 1 - session neni open");
    }
}

