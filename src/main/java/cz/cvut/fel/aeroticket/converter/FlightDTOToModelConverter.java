package cz.cvut.fel.aeroticket.converter;

import cz.cvut.fel.aeroticket.dto.FlightDTO;
import cz.cvut.fel.aeroticket.model.Flight;

import javax.ejb.Singleton;
import java.math.BigDecimal;

@Singleton
public class FlightDTOToModelConverter implements Converter<FlightDTO, Flight> {

    @Override
    public Flight convert(FlightDTO source) {
        Flight flight = new Flight();
        return convert(source, flight);
    }

    @Override
    public Flight convert(FlightDTO source, Flight instance) {
        instance.setPrice(source.getPrice());
        instance.setDateOfDeparture(source.getDateOfDeparture());
        instance.setName(source.getName());
        instance.setNumberOfSeats(source.getNumberOfSeats());
        instance.setDistance(BigDecimal.valueOf(source.getDistance()));
        return instance;
    }

}
