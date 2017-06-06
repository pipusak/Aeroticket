package cz.cvut.fel.aeroticket.converter;

import cz.cvut.fel.aeroticket.dto.ClientDTO;
import cz.cvut.fel.aeroticket.model.Client;

import javax.ejb.Singleton;

@Singleton
public class ClientToDTOConverter implements Converter<Client, ClientDTO> {

    @Override
    public ClientDTO convert(Client source) {
        ClientDTO clientDTO = new ClientDTO();
        return convert(source, clientDTO);
    }

    @Override
    public ClientDTO convert(Client source, ClientDTO instance) {
        instance.setDateOfBirth(source.getDateOfBirth());
        instance.setFirstName(source.getFirstName());
        instance.setLastName(source.getLastName());
        instance.setId(source.getId());
        instance.setEmail(source.getEmail());
        instance.setPassword(source.getPassword());
        instance.setRole(source.getRole().toString());
        return instance;
    }

}
