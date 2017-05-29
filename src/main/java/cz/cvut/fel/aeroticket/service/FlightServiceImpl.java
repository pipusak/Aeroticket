package cz.cvut.fel.aeroticket.service;

import cz.cvut.fel.aeroticket.dto.DTOContainer;
import cz.cvut.fel.aeroticket.dto.FlightDTO;
import cz.cvut.fel.aeroticket.dto.FlightsDTO;
import cz.cvut.fel.aeroticket.exception.NotFoundException;
import cz.cvut.fel.aeroticket.model.Destination;
import cz.cvut.fel.aeroticket.model.Flight;
import cz.cvut.fel.aeroticket.repository.DestinationRepository;
import cz.cvut.fel.aeroticket.repository.FlightRepository;
import cz.cvut.fel.aeroticket.repository.ReservationItemRepository;

import javax.ejb.Stateless;
import javax.inject.Inject;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@Stateless
public class FlightServiceImpl extends BaseEntityService<Flight, FlightDTO> implements FlightService {

    private final static Logger logger = Logger.getLogger(FlightServiceImpl.class.getName());

    @Inject
    private DestinationRepository destinationRepository;

    @Inject
    private FlightRepository flightRepository;

    @Inject
    private ReservationItemRepository reservationItemRepository;

    @Override
    protected DTOContainer<FlightDTO> getContainerFromList(List<FlightDTO> list) {
        FlightsDTO flightsDTO = new FlightsDTO();
        flightsDTO.setFlights(list);
        return flightsDTO;
    }

    @Override
    protected void doExtraMappings(Flight model, FlightDTO flightDTO) {
        Optional<Destination> destinationFrom = destinationRepository.find(flightDTO.getFrom());
        Optional<Destination> destinationTo = destinationRepository.find(flightDTO.getTo());
        if (destinationFrom.isPresent() && destinationTo.isPresent()) {
            model.setFrom(destinationFrom.get());
            model.setTo(destinationTo.get());
        } else {
            logger.warning(String.format("Destination with ID %d or %d was not found", flightDTO.getFrom(), flightDTO.getTo()));
            throw new NotFoundException("Destination was not found");
        }
    }

    @Override
    public Integer getAvailableSeatsCount(Long flightId) {
        Optional<Flight> flight = flightRepository.find(flightId);
        if (flight.isPresent()) {
            Integer orderedItemsCount = reservationItemRepository.getFlightOrderedSeatsCount(flightId);
            return flight.get().getNumberOfSeats() - orderedItemsCount;
        } else {
            logger.warning(String.format("Flight with ID %d was not found", flightId));
            throw new NotFoundException("Flight not exists");
        }
    }
}
