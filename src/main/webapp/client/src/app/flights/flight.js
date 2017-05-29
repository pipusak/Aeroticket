"use strict";
var Flight = (function () {
    function Flight(name, numberOfSeats, to, from, price, dateOfDeparture, distance) {
        this.name = name;
        this.numberOfSeats = numberOfSeats;
        this.to = to;
        this.from = from;
        this.price = price;
        this.dateOfDeparture = dateOfDeparture;
        this.distance = distance;
    }
    return Flight;
}());
exports.Flight = Flight;
