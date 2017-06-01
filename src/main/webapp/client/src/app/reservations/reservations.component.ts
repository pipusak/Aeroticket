import {Component, OnInit} from "@angular/core";
import {Reservation} from "./reservation";
import {ReservationsService} from "./reservations.service";
import {FlightService} from "../flights/flights.service";
import {ListRequest} from "../model/list-request";
import {SortDirection} from "../model/sort-direction";
@Component({
  selector: 'reservations',
  templateUrl: 'reservations.component.html'
})
export class ReservationsComponent implements OnInit {

  reservations: Reservation[];

  totalPageCount: number;

  private request: ListRequest = {
    sorting: {
      fieldName: 'id',
      direction: SortDirection.Asc
    },
    pageNumber: 0
  };

  constructor(private reservationService: ReservationsService) {
  }

  ngOnInit(): void {

    this.updateReservations();
  }

  private updateReservations() {
    this.reservationService.getReservationsList(this.request).then(response => {
      this.totalPageCount=response.pageCount;
     this.reservations = response.reservations;
    });
}
}
