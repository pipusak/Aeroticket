import {Component, OnInit} from "@angular/core";
import {ReservationsService} from "./reservations.service";
import {Reservation} from "./reservation";
import {SortDirection} from "../model/sort-direction";
import {AuthenticationService} from "../login/authentication.service";
import {FlightService} from "../flights/flights.service";
import {DestinationService} from "../destination/destination.service";
@Component({
  selector: 'my-reservations',
  templateUrl: 'my-reservations.component.html'
})
export class MyReservationsComponent implements OnInit {

  private reservations: Reservation[];

  totalPageCount: number;

  constructor(private reservationService: ReservationsService, private authService: AuthenticationService,
              private flightService: FlightService, private destinationService: DestinationService) {
  }


  ngOnInit() {
    this.updateReservationsList();
  }

  private updateReservationsList() {

    let userId = this.authService.getUserId();
    let reservationRequest = {
      sorting: {
        fieldName: 'id',
        direction: SortDirection.Asc
      },
      pageNumber: 0
    };


    this.reservationService.getReservationsList(reservationRequest).then(response => {
      this.reservations=response.reservations;
    });
  }




  getFlightRouteString(flightId: number): Promise<string> {
    return this.flightService.getFlight(flightId).then(flight => {
      let destTo = this.destinationService.getDestination(<number> flight.to).then(destination => destination.name);
      let destFrom = this.destinationService.getDestination(<number> flight.from).then(destination => destination.name);
      return `${destFrom} - ${destTo}`
    });
  }
}
