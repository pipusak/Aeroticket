package cz.cvut.fel.aeroticket.converter;

import cz.cvut.fel.aeroticket.dto.ClientDTO;
import cz.cvut.fel.aeroticket.model.Client;

import javax.ejb.Singleton;

@Singleton
public class ClientDTOToModelConverter implements Converter<ClientDTO, Client> {

    @Override
    public Client convert(ClientDTO source) {
        Client client = new Client();
        return convert(source, client);
    }

    @Override
    public Client convert(ClientDTO source, Client instance) {
        instance.setEmail(source.getEmail());
        instance.setFirstName(source.getFirstName());
        instance.setLastName(source.getLastName());
        instance.setDateOfBirth(source.getDateOfBirth());
        return instance;
    }

}
