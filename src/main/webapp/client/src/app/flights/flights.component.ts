import {Component, OnInit} from "@angular/core";
import {FlightService} from "./flights.service";
import {Flight} from "./flight";
import {ListRequest} from "../model/list-request";
import {SortDirection} from "../model/sort-direction";
import {DestinationService} from "../destination/destination.service";
import {Destination} from "../destination/destination";
import {AuthenticationService} from "../login/authentication.service";
@Component({
  selector: 'flights',
  templateUrl: 'flights.component.html'
})
export class FlightsComponent implements OnInit {

  flights: Flight[];
  totalPageCount: number;
  selectedFlightId: number;

  private request: ListRequest = {
    sorting: {
      fieldName: 'id',
      direction: SortDirection.Asc
    },
    pageNumber: 0
  };

  constructor(private flightService: FlightService, private destinationService: DestinationService, private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.updateFlights();
  }

  sort(sortBy: string) {
    this.setSorting(sortBy);
    this.updateFlights();
  }

  private updateFlights() {
    let destRequest = {
      sorting: {
        fieldName: 'id',
        direction: SortDirection.Asc
      },
      pageNumber: -1
    };

    this.flightService.getFlightsList(this.request).then(response => {
      this.totalPageCount = response.pageCount;
      return response.flights;
    }).then((flights: Flight[]) => {
      this.destinationService.getDestinationsList(destRequest).then(response => {
        let destinationsList = response.destinations;
        flights.forEach(flight => {
          flight.to = this.findDestinationName(<number> flight.to, destinationsList);
          flight.from = this.findDestinationName(<number> flight.from, destinationsList);
        });
        this.flights = flights;
      });
    });
  }

  private findDestinationName(id: number, destination: Destination[]): string {
    for (let i = 0, n = destination.length; i < n; i++) {
      let destId = destination[i].id;
      if (id === destId) {
        return destination[i].name;
      }
    }

    return "";
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
    this.updateFlights();
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

  selectFlight(id: number) {
    this.selectedFlightId = id;
  }

  onDeleteRequest(targetFlightId: number) {
    this.flightService.deleteFlight(targetFlightId);
    // Wait 250 ms until list update, to be sure, that the operation done after delete request complete
    setTimeout(() => {
      this.updateFlights()
    }, 250);
  }
  
  isUserAdmin(): boolean {
    return this.authService.isAdmin();
  }
  
  isUserLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
