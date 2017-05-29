package cz.cvut.fel.aeroticket.service;

import cz.cvut.fel.aeroticket.dto.FlightDTO;
import cz.cvut.fel.aeroticket.model.Flight;

public interface FlightService extends EntityService<Flight, FlightDTO> {

    Integer getAvailableSeatsCount(Long flightId);

}
