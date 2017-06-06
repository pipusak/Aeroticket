import {Component, OnInit} from "@angular/core";
import {Reservation} from "./reservation";
import {ReservationsService} from "./reservations.service";
import {FlightService} from "../flights/flights.service";
import {ListRequest} from "../model/list-request";
import {SortDirection} from "../model/sort-direction";
import {AuthenticationService} from "../login/authentication.service";
@Component({
  selector: 'reservations',
  templateUrl: 'reservations.component.html'
})
export class ReservationsComponent implements OnInit {

  reservations: Reservation[];
  selectedReservationtId: number;
  totalPageCount: number;

  private request: ListRequest = {
    sorting: {
      fieldName: 'id',
      direction: SortDirection.Asc
    },
    pageNumber: 0
  };

  constructor(private reservationService: ReservationsService, private authService: AuthenticationService) {
  }

  ngOnInit(): void {

    this.updateReservations();
  }

  private updateReservations() {
    this.reservationService.getReservationsList(this.request).then(response => {
      this.totalPageCount=response.pageCount;
      console.log("Page count",response.pageCount);
     this.reservations = response.reservations;
      console.log("REservations",response.reservations);
      console.log("Reservations local ",this.reservations);

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
  selectReservation(id: number) {
    this.selectedReservationtId = id;
  }
  private isClassActive(elementName: string) {
    return this.request.sorting.fieldName === elementName;
  }

  private getSortDirection() {
    return this.request.sorting.direction;
  }

  onDeleteRequest(targetReservationId: number) {
    this.reservationService.deleteReservation(targetReservationId);
    // Wait 250 ms until list update, to be sure, that the operation done after delete request complete
    setTimeout(() => {
      this.updateReservations()
    }, 250);
  }

  isUserAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isUserLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
