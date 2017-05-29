package cz.cvut.fel.aeroticket.dto;


public interface DTOContainer<DTO> {

    boolean isNextPage();

    Integer getPageCount();

    void setPageCount(Integer pageCount);

    void setNextPage(Boolean nextPage);

}
