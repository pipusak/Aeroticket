export class Flight {

  id: number;
  name: string;
  numberOfSeats: number;
  to: number | string;
  from: number | string;
  price: number;
  dateOfDeparture: string;
  distance: number;


  constructor(name: string, numberOfSeats: number, to: number, from: number, price: number, dateOfDeparture: string, distance: number) {
    this.name = name;
    this.numberOfSeats = numberOfSeats;
    this.to = to;
    this.from = from;
    this.price = price;
    this.dateOfDeparture = dateOfDeparture;
    this.distance = distance;
  }
}
