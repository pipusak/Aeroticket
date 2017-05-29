package cz.cvut.fel.aeroticket.service;

import cz.cvut.fel.aeroticket.dto.DTOContainer;
import cz.cvut.fel.aeroticket.dto.DestinationDTO;
import cz.cvut.fel.aeroticket.dto.DestinationsDTO;
import cz.cvut.fel.aeroticket.model.Destination;

import javax.ejb.Stateless;
import java.util.List;


@Stateless
public class DestinationServiceImpl extends BaseEntityService<Destination, DestinationDTO> implements DestinationService {

    @Override
    protected DTOContainer<DestinationDTO> getContainerFromList(List<DestinationDTO> list) {
        DestinationsDTO destinationsDTO = new DestinationsDTO();
        destinationsDTO.setDestinationDTOs(list);
        return destinationsDTO;
    }

}
