package cz.cvut.fel.aeroticket.repository;


import cz.cvut.fel.aeroticket.filter.Filter;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Transactional
abstract class BaseEntityRepository<ENTITY> implements EntityRepository<ENTITY> {

    private static final String ASC_ORDER = "ASC";
    private Class<ENTITY> entityClass;

    public BaseEntityRepository(Class<ENTITY> entityClass) {
        this.entityClass = entityClass;
    }

    @PersistenceContext
    protected EntityManager entityManager;

    @Override
    public ENTITY save(ENTITY entity) {
        ENTITY result = entityManager.merge(entity);
        return result;
    }

    @Override
    public void delete(ENTITY entity) {
        entityManager.remove(entity);
    }

    @Override
    public List<ENTITY> findAll() {
        return find(new Filter());
    }

    @Override
    public Optional<ENTITY> find(Long id) {
        return Optional.ofNullable(entityManager.find(entityClass, id));
    }

    @Override
    public List<ENTITY> find(Filter filter) {
        return getEntityQuery(filter).getResultList();
    }

    @Override
    public long count() {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Long> criteriaQuery = criteriaBuilder.createQuery(Long.class);
        Root<ENTITY> entityRoot = criteriaQuery.from(entityClass);
        criteriaQuery.select(criteriaBuilder.count(entityRoot));
        return entityManager.createQuery(criteriaQuery).getSingleResult();
    }

    private Order getOrder(Filter filter, CriteriaBuilder criteriaBuilder, Root<ENTITY> entityRoot) throws IllegalArgumentException {
        Path<ENTITY> path = entityRoot.get(filter.getOrderBy());
        return (ASC_ORDER.equalsIgnoreCase(filter.getOrder()))
                ? criteriaBuilder.asc(path)
                : criteriaBuilder.desc(path);
    }

    private TypedQuery<ENTITY> getEntityQuery(Filter filter) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<ENTITY> criteriaQuery = criteriaBuilder.createQuery(entityClass);
        Root<ENTITY> entityRoot = criteriaQuery.from(entityClass);
        criteriaQuery.select(entityRoot);
        if (filter.isOrdered()) {
            try {
                criteriaQuery.orderBy(getOrder(filter, criteriaBuilder, entityRoot));
            } catch (IllegalArgumentException e) {}
        }
        TypedQuery<ENTITY> entityTypedQuery = entityManager.createQuery(criteriaQuery);
        if (filter.getPage() > -1) {
            int offset = filter.getPage() * Filter.PAGE_SIZE;
            entityTypedQuery.setMaxResults(Filter.PAGE_SIZE);
            entityTypedQuery.setFirstResult(offset);
        }
        return entityTypedQuery;
    }

}
