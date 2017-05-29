package cz.cvut.fel.aeroticket.banner;

import cz.cvut.fel.aeroticket.dto.FlightDTO;
import cz.cvut.fel.aeroticket.model.Destination;
import cz.cvut.fel.aeroticket.service.DestinationService;
import cz.cvut.fel.aeroticket.service.FlightService;
import cz.cvut.fel.aeroticket.websocket.FlightWSocket;
import org.hibernate.annotations.SourceType;

import javax.inject.Inject;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.spi.JsonProvider;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

/**
 * Created by TomasNovotny on 28.5.2017.
 */
public class BannerThread extends Thread {

    @Inject
    private FlightService flightService;

    @Inject
    private DestinationService destinationService;

    BannerController bc;


    public void run(){



        while(true){
            try {
                //co pet sekund se poslou data na klienta (v praxi to bude spis tak co 15 sekund)
                Thread.sleep(5000);


                if(bc.getSize()>0){

                BannerEmit.send(bc.getFlightsStrings());
                }


            } catch (InterruptedException ex) {
                //konec vlakna je mozno volat explicitne
                System.out.println("koncim 2 - explicitni interrupt");
                return;
            } catch(Exception e){
            }
        }
       // System.out.println("koncim 1 - session neni open");
    }



    public void setBc(BannerController bc) {
        this.bc = bc;
    }


}
