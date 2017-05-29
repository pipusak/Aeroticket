package cz.cvut.fel.aeroticket.converter;

import cz.cvut.fel.aeroticket.dto.FlightDTO;
import cz.cvut.fel.aeroticket.model.Flight;

import javax.ejb.Singleton;

@Singleton
public class FlightToDTOConverter implements Converter<Flight, FlightDTO> {

    @Override
    public FlightDTO convert(Flight source) {
        FlightDTO flightDTO = new FlightDTO();
        return convert(source, flightDTO);
    }

    @Override
    public FlightDTO convert(Flight source, FlightDTO instance) {
        instance.setId(source.getId());
        instance.setName(source.getName());
        instance.setDistance(source.getDistance().doubleValue());
        instance.setNumberOfSeats(source.getNumberOfSeats());
        instance.setFrom(source.getFrom().getId());
        instance.setTo(source.getTo().getId());
        instance.setDateOfDeparture(source.getDateOfDeparture());
        instance.setPrice(source.getPrice());
        return instance;
    }

}
