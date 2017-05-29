package cz.cvut.fel.aeroticket.converter;


import cz.cvut.fel.aeroticket.dto.DestinationDTO;
import cz.cvut.fel.aeroticket.model.Destination;

import javax.ejb.Singleton;

@Singleton
public class DestinationToDTOConverter implements Converter<Destination, DestinationDTO> {

    @Override
    public DestinationDTO convert(Destination source) {
        DestinationDTO destinationDTO = new DestinationDTO();
        return convert(source, destinationDTO);
    }

    @Override
    public DestinationDTO convert(Destination source, DestinationDTO instance) {
        instance.setId(source.getId());
        instance.setName(source.getName());
        instance.setLatitude(source.getLatitude().doubleValue());
        instance.setLongitude(source.getLongitude().doubleValue());
        return instance;
    }

}
