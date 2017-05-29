package cz.cvut.fel.aeroticket.repository;

import cz.cvut.fel.aeroticket.model.Flight;

import javax.ejb.Stateless;

@Stateless
public class FlightRepositoryImpl extends BaseEntityRepository<Flight> implements FlightRepository {

    public FlightRepositoryImpl() {
        super(Flight.class);
    }

}
