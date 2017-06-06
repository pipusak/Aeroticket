package cz.cvut.fel.aeroticket.repository;

import cz.cvut.fel.aeroticket.model.Client;

import javax.ejb.Stateless;
import javax.persistence.TypedQuery;

@Stateless
public class ClientRepositoryImpl extends BaseEntityRepository<Client> implements ClientRepository {

    public ClientRepositoryImpl() {
        super(Client.class);
    }

    @Override
    public Client getClientByEmail(String email) {
        TypedQuery<Client> query = entityManager
                .createNamedQuery("clientByEmail", Client.class)
                .setParameter("email", email);
        return query.getSingleResult();
    }
}
