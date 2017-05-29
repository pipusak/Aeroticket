package cz.cvut.fel.aeroticket.converter;

import cz.cvut.fel.aeroticket.dto.DestinationDTO;
import cz.cvut.fel.aeroticket.model.Destination;

import javax.ejb.Singleton;
import java.math.BigDecimal;

@Singleton
public class DestinationDTOToModelConverter implements Converter<DestinationDTO, Destination> {

    @Override
    public Destination convert(DestinationDTO source) {
        Destination destination = new Destination();
        return convert(source, destination);
    }

    @Override
    public Destination convert(DestinationDTO source, Destination instance) {
        instance.setName(source.getName());
        instance.setLatitude(BigDecimal.valueOf(source.getLatitude()));
        instance.setLongitude(BigDecimal.valueOf(source.getLongitude()));
        return instance;
    }

}
