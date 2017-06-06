package cz.cvut.fel.aeroticket.converter;

import cz.cvut.fel.aeroticket.dto.ClientDTO;
import cz.cvut.fel.aeroticket.model.Client;
import cz.cvut.fel.aeroticket.model.client.Role;

import javax.ejb.Singleton;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

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
        instance.setPassword(source.getPassword());
        instance.setFirstName(source.getFirstName());
        instance.setLastName(source.getLastName());
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");

        instance.setDateOfBirth(LocalDate.parse(source.getDateOfBirth() ,formatter));
        instance.setRole(Role.valueOf(source.getRole()));
        return instance;
    }

}
