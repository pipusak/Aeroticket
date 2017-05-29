package cz.cvut.fel.aeroticket.service;


import cz.cvut.fel.aeroticket.dto.DTOContainer;
import cz.cvut.fel.aeroticket.filter.Filter;

public interface EntityService<ENTITY, DTO> {

    DTO save(DTO instance);

    DTO update(Long id, DTO instance);

    DTO find(Long id);

    void delete(Long id);

    DTOContainer<DTO> findAll();

    DTOContainer<DTO> find(Filter filter);

}
