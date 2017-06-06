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

  reservations: Reservation[];

  totalPageCount: number;


   request = {
  sorting: {
    fieldName: 'id',
    direction: SortDirection.Asc
  },
  pageNumber: 0
};

  constructor(private reservationService: ReservationsService, private authService: AuthenticationService,
              private flightService: FlightService, private destinationService: DestinationService) {
  }


  ngOnInit() {
    this.updateReservations();
  }

  private updateReservations() {

    let userId = this.authService.getUserId();
    this.request.sorting.fieldName= 'userId';



      this.reservationService.getReservationsList(this.request).then(response => {
        this.totalPageCount=response.pageCount;
        this.reservations = response.reservations;

      });

  }




  getFlightRouteString(flightId: number): Promise<string> {
    return this.flightService.getFlight(flightId).then(flight => {
      let destTo = this.destinationService.getDestination(<number> flight.to).then(destination => destination.name);
      let destFrom = this.destinationService.getDestination(<number> flight.from).then(destination => destination.name);
      return `${destFrom} - ${destTo}`
    });
  }

  private setSorting(sortBy: string) {
    if (sortBy === this.request.sorting.fieldName) {
      this.request.sorting.direction === SortDirection.Asc ? this.request.sorting.direction = SortDirection.Desc
        : this.request.sorting.direction = SortDirection.Asc;
    } else {
      this.request.sorting.fieldName = sortBy;
      this.request.sorting.direction = SortDirection.Asc;
    }
  }

  onChangeActivePage(activePage: number) {
    this.setActivePage(activePage);
    this.updateReservations();
  }

  private setActivePage(activePage: number) {
    this.request.pageNumber = activePage;
  }

  getSortingClasses(elementName: string) {
    let classes = {
      'sort-desc': false,
      'sort-asc': false
    };

    if (this.isClassActive(elementName)) {
      if (this.getSortDirection() === 1) {
        classes['sort-asc'] = true;
      } else {
        classes['sort-desc'] = true;
      }
    }
    return classes;
  }

  private isClassActive(elementName: string) {
    return this.request.sorting.fieldName === elementName;
  }

  private getSortDirection() {
    return this.request.sorting.direction;
  }

  onCancelRequest(targetReservationId: number) {
    this.reservationService.getReservation(targetReservationId).then(reservation =>{
      reservation.reservationStatus='CANCELLED';
      this.reservationService.updateReservation(targetReservationId,reservation);

    })

    // Wait 250 ms until list update, to be sure, that the operation done after delete request complete
    setTimeout(() => {
      this.updateReservations()
    }, 250);
  }

  onPayRequest(targetReservationId: number) {
    this.reservationService.getReservation(targetReservationId).then(reservation =>{
      reservation.reservationStatus='PAID';
      this.reservationService.updateReservation(targetReservationId,reservation);

    })

    // Wait 250 ms until list update, to be sure, that the operation done after delete request complete
    setTimeout(() => {
      this.updateReservations()
    }, 250);
    // Wait 250 ms until list update, to be sure, that the operation done after delete request complete
    setTimeout(() => {
      this.updateReservations()
    }, 250);
  }
}
