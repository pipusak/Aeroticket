package cz.cvut.fel.aeroticket.reservation;

public enum PassengerType {
    BABY(0, 2, false, false, 1F),
    CHILD(2, 18, true, false, 0.20F),
    STUDENT(16, 26, true, true, 0.15F),
    ADULT(26, 65, true, true, 0F),
    SENIOR(65, 200, true, true, 0.15F);

    private int ageFrom;
    private int ageTo;
    private boolean requestSeat;
    private boolean canFlightAlone;
    private float sale;

    PassengerType(int ageFrom, int ageTo, boolean requestSeat, boolean canFlightAlone, float sale) {
        this.ageFrom = ageFrom;
        this.ageTo = ageTo;
        this.requestSeat = requestSeat;
        this.canFlightAlone = canFlightAlone;
        this.sale = sale;
    }

    public int getAgeFrom() {
        return ageFrom;
    }

    public int getAgeTo() {
        return ageTo;
    }

    public boolean isRequestSeat() {
        return requestSeat;
    }

    public boolean isCanFlightAlone() {
        return canFlightAlone;
    }

    public float getSale() {
        return sale;
    }

}
