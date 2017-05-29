package cz.cvut.fel.aeroticket.service;


import cz.cvut.fel.aeroticket.converter.Converter;
import cz.cvut.fel.aeroticket.dto.DTOContainer;
import cz.cvut.fel.aeroticket.exception.NotFoundException;
import cz.cvut.fel.aeroticket.filter.Filter;
import cz.cvut.fel.aeroticket.repository.EntityRepository;

import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Transactional
abstract class BaseEntityService<ENTITY, DTO> implements EntityService<ENTITY, DTO> {

    @Inject
    protected EntityRepository<ENTITY> repository;

    @Inject
    protected Converter<ENTITY, DTO> entityToDtoConverter;

    @Inject
    protected Converter<DTO, ENTITY> dtoToEntityConverter;

    @Override
    public DTO save(DTO instance) {
        ENTITY model = dtoToEntityConverter.convert(instance);
        doExtraMappings(model, instance);
        ENTITY result = repository.save(model);
        return entityToDtoConverter.convert(result);
    }

    @Override
    public DTO update(Long id, DTO instance) {
        Optional<ENTITY> model = repository.find(id);
        if (model.isPresent()) {
            ENTITY extractedModel = dtoToEntityConverter.convert(instance, model.get());
            doExtraMappings(extractedModel, instance);
            ENTITY updatedModel = repository.save(extractedModel);
            return entityToDtoConverter.convert(updatedModel);
        } else {
            throw new NotFoundException();
        }
    }

    @Override
    public DTO find(Long id) {
        Optional<ENTITY> model = repository.find(id);
        if (model.isPresent()) {
            return entityToDtoConverter.convert(model.get());
        } else {
            throw new NotFoundException();
        }
    }

    @Override
    public void delete(Long id) {
        Optional<ENTITY> model = repository.find(id);
        if (model.isPresent()) {
            repository.delete(model.get());
        } else {
            throw new NotFoundException();
        }
    }

    @Override
    public DTOContainer<DTO> findAll() {
        return find(new Filter());
    }

    @Override
    public DTOContainer<DTO> find(Filter filter) {
        List<ENTITY> models = repository.find(filter);
        List<DTO> resultList = models
                .stream()
                .map(entityToDtoConverter::convert)
                .collect(Collectors.toList());
        DTOContainer<DTO> result = getContainerFromList(resultList);
        if (filter.getPage() > -1) {
            setPageInfo(filter, result);
        }
        return result;
    }

    private void setPageInfo(Filter filter, DTOContainer<DTO> container) {
        Integer pageCount = Double.valueOf(Math.ceil((double) repository.count() / Filter.PAGE_SIZE)).intValue();
        container.setPageCount(pageCount);
        container.setNextPage((pageCount - 1) > filter.getPage());
    }

    protected abstract DTOContainer<DTO> getContainerFromList(List<DTO> list);

    protected void doExtraMappings(ENTITY model, DTO dto) {
    }

}
