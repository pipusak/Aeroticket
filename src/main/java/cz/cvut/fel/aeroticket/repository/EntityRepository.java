package cz.cvut.fel.aeroticket.repository;

import cz.cvut.fel.aeroticket.filter.Filter;

import java.util.List;
import java.util.Optional;

public interface EntityRepository<ENTITY> {

    ENTITY save(ENTITY entity);

    void delete(ENTITY entity);

    List<ENTITY> findAll();

    Optional<ENTITY> find(Long id);

    List<ENTITY> find(Filter filter);

    long count();

}
