package cz.cvut.fel.aeroticket.repository;

import cz.cvut.fel.aeroticket.model.Destination;

import javax.ejb.Stateless;

@Stateless
public class DestinationRepositoryImpl extends BaseEntityRepository<Destination> implements DestinationRepository {

    public DestinationRepositoryImpl() {
        super(Destination.class);
    }

}
