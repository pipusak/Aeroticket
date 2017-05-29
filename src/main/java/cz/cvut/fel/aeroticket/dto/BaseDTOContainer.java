package cz.cvut.fel.aeroticket.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
abstract class BaseDTOContainer<DTO> implements DTOContainer<DTO> {

    private Boolean nextPage;
    private Integer pageCount;

    @Override
    public boolean isNextPage() {
        return false;
    }

    @Override
    public Integer getPageCount() {
        return pageCount;
    }

    public Boolean getNextPage() {
        return nextPage;
    }

    public void setNextPage(Boolean nextPage) {
        this.nextPage = nextPage;
    }

    public void setPageCount(Integer pageCount) {
        this.pageCount = pageCount;
    }

}
