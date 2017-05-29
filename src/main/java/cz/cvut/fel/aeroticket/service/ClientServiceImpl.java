package cz.cvut.fel.aeroticket.service;

import cz.cvut.fel.aeroticket.dto.ClientDTO;
import cz.cvut.fel.aeroticket.dto.ClientsDTO;
import cz.cvut.fel.aeroticket.dto.DTOContainer;
import cz.cvut.fel.aeroticket.model.Client;

import javax.ejb.Stateless;
import java.util.List;

@Stateless
public class ClientServiceImpl extends BaseEntityService<Client, ClientDTO> implements ClientService {

    @Override
    protected DTOContainer<ClientDTO> getContainerFromList(List<ClientDTO> list) {
        ClientsDTO clientsDTO = new ClientsDTO();
        clientsDTO.setClients(list);
        return clientsDTO;
    }

}
