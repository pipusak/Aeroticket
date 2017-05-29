
package cz.cvut.fel.aeroticket.websocket;

/**
 *
 * @author dan
 */
public class FlightWSocket {
     private int id;
    private String fromDest;
    private String toDest;
    //private String status;
    private String departureTime;
    private String departureDate;
    private String price;
    //private String type;
    //private String description;
    
    public FlightWSocket(int id, String toDest, String fromDest, String departureTime, String departureDate, String price){
        this.id = id;
        this.toDest = toDest;
        this.fromDest = fromDest;
        this.departureTime = departureTime;
        this.departureDate = departureDate;
        this.price = price;
    }
    
    public int getId() {
        return id;
    }
    
    public String getToDest() {
        return toDest;
    }
    
    public String getFromDest() {
        return fromDest;
    }
    
    public String getDepartureTime(){
        return departureTime;
    }
    
    public String getDepartureDate(){
        return departureDate;
    }
    
    public String getPrice(){
        return price;
    }
        
}
