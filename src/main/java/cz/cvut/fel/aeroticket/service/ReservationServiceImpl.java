package cz.cvut.fel.aeroticket.service;

import cz.cvut.fel.aeroticket.dto.DTOContainer;
import cz.cvut.fel.aeroticket.dto.ReservationDTO;
import cz.cvut.fel.aeroticket.dto.ReservationsDTO;
import cz.cvut.fel.aeroticket.exception.NotFoundException;
import cz.cvut.fel.aeroticket.model.Client;
import cz.cvut.fel.aeroticket.model.Reservation;
import cz.cvut.fel.aeroticket.repository.ClientRepository;
import cz.cvut.fel.aeroticket.repository.FlightRepository;
import cz.cvut.fel.aeroticket.repository.ReservationItemRepository;
import cz.cvut.fel.aeroticket.model.reservation.ReservationStatus;

import javax.ejb.Stateless;
import javax.inject.Inject;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@Stateless
public class ReservationServiceImpl extends BaseEntityService<Reservation, ReservationDTO> implements ReservationService {

    private final static Logger logger = Logger.getLogger(ReservationServiceImpl.class.getName());

    @Inject
    private FlightRepository flightRepository;

    @Inject
    private ReservationItemRepository reservationItemRepository;

    @Inject
    private ClientRepository clientRepository;

    @Inject
    private PriceService priceService;

    @Override
    public ReservationDTO save(ReservationDTO instance) {
        Reservation model = dtoToEntityConverter.convert(instance);
        model.setCreated(new Date());
        model.setReservationStatus(ReservationStatus.NEW);
        Optional<Client> client = clientRepository.find(instance.getClient());
        if (client.isPresent()) {
            model.setClient(client.get());
        } else {
            logger.warning(String.format("Client with ID %d was not found", instance.getClient()));
            throw new NotFoundException("Client was not found");
        }
        model.setPrice(priceService.calculateReservationPrice(model));
        Reservation result = repository.save(model);
        return entityToDtoConverter.convert(result);
    }

    @Override
    public ReservationDTO update(Long id, ReservationDTO instance) {
        Optional<Reservation> model = repository.find(id);
        if (model.isPresent()) {
            Reservation extractedModel = dtoToEntityConverter.convert(instance, model.get());
            Optional<Client> client = clientRepository.find(instance.getClient());
            if (client.isPresent()) {
                extractedModel.setClient(client.get());
            } else {
                logger.warning(String.format("Client with ID %d was not found", instance.getClient()));
                throw new NotFoundException("Client was not found");
            }
            extractedModel.setPrice(priceService.calculateReservationPrice(extractedModel));
            if (instance.getReservationStatus() != null) {
                extractedModel.setReservationStatus(instance.getReservationStatus());
            }
            Reservation updatedModel = repository.save(extractedModel);
            return entityToDtoConverter.convert(updatedModel);
        } else {
            logger.warning(String.format("Reservation with ID %d was not found", id));
            throw new NotFoundException("Reservation was not found");
        }
    }

    @Override
    protected DTOContainer<ReservationDTO> getContainerFromList(List<ReservationDTO> list) {
        ReservationsDTO reservationsDTO = new ReservationsDTO();
        reservationsDTO.setReservations(list);
        return reservationsDTO;
    }

    @Override
    public Integer getAvailableSeatsCount(Long flightId, Long reservationId) {
        return reservationItemRepository.getReservationOrderedSeatsCount(reservationId, flightId);
    }

}
