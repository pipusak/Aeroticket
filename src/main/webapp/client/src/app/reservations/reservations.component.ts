import {Component, OnInit} from "@angular/core";
import {Reservation} from "./reservation";
import {ReservationsService} from "./reservations.service";
import {FlightService} from "../flights/flights.service";
import {SortDirection} from "../model/sort-direction";
@Component({
  templateUrl: 'reservations.component.html',
  selector: 'reservations'
})
export class ReservationsComponent implements OnInit {

  reservations: Reservation[];

  constructor(private reservationService: ReservationsService, private flightService: FlightService) {
  }

  ngOnInit(): void {
    this.updateReservations();
  }

  private updateReservations() {
    let flightsRequest = {
      sorting: {
        fieldName: 'id',
        direction: SortDirection.Asc
      },
      pageNumber: -1
    };
  }
}
