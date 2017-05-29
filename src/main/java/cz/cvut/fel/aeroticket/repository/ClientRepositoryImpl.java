package cz.cvut.fel.aeroticket.repository;

import cz.cvut.fel.aeroticket.model.Client;

import javax.ejb.Stateless;

@Stateless
public class ClientRepositoryImpl extends BaseEntityRepository<Client> implements ClientRepository {

    public ClientRepositoryImpl() {
        super(Client.class);
    }

}
