package cz.cvut.fel.aeroticket.repository;

import cz.cvut.fel.aeroticket.model.Client;

public interface ClientRepository extends EntityRepository<Client> {

    Client getClientByEmail(String email);
}
