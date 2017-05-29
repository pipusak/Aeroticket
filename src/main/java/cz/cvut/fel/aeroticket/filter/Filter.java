package cz.cvut.fel.aeroticket.filter;


public class Filter {

    public final static int PAGE_SIZE = 3;

    private int page = -1;
    private String orderBy;
    private String order;

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public String getOrderBy() {
        return orderBy;
    }

    public void setOrderBy(String orderBy) {
        this.orderBy = orderBy;
    }

    public String getOrder() {
        return order;
    }

    public void setOrder(String order) {
        this.order = order;
    }

    public boolean isOrdered() {
        return order != null && orderBy != null && !"".equals(order) && !"".equals(orderBy);
    }

    public static FilterBuilder getBuilder() {
        return new FilterBuilder();
    }

    public static class FilterBuilder {

        private FilterBuilder() {
        }

        private int page = -1;
        private String orderBy;
        private String order;

        public FilterBuilder page(int page) {
            this.page = page;
            return this;
        }

        public FilterBuilder orderBy(String property) {
            this.orderBy = property;
            return this;
        }

        public FilterBuilder order(String order) {
            this.order = order;
            return this;
        }

        public Filter build() {
            Filter filter = new Filter();
            filter.setPage(this.page);
            filter.setOrder(this.order);
            filter.setOrderBy(this.orderBy);
            return filter;
        }

    }

}
