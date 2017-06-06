package cz.cvut.fel.aeroticket.service;

import cz.cvut.fel.aeroticket.dto.ClientDTO;
import cz.cvut.fel.aeroticket.dto.ClientsDTO;
import cz.cvut.fel.aeroticket.dto.DTOContainer;
import cz.cvut.fel.aeroticket.exception.NotFoundException;
import cz.cvut.fel.aeroticket.model.Client;
import cz.cvut.fel.aeroticket.repository.ClientRepository;

import javax.ejb.Stateless;
import java.util.List;
import java.util.Optional;

@Stateless
public class ClientServiceImpl extends BaseEntityService<Client, ClientDTO> implements ClientService {

    @Override
    protected DTOContainer<ClientDTO> getContainerFromList(List<ClientDTO> list) {
        ClientsDTO clientsDTO = new ClientsDTO();
        clientsDTO.setClients(list);
        return clientsDTO;
    }

    @Override
    public ClientDTO getClientByEmail(String email) {
        Client model = ((ClientRepository)repository).getClientByEmail(email);
        if (model!=null) {
            return entityToDtoConverter.convert(model);
        } else {
            throw new NotFoundException();
        }
    }
    }

