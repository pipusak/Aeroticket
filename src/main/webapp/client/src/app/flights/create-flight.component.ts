import {Component, OnInit} from "@angular/core";
import {FlightService} from "./flights.service";
import {DestinationService} from "../destination/destination.service";
import {Flight} from "./flight";
import {RequestStatus} from "../shared/request-status";
import {ListRequest} from "../model/list-request";
import {SortDirection} from "../model/sort-direction";
import {Destination} from "../destination/destination";
@Component({
  selector: 'create-flight',
  templateUrl: 'create-flight.component.html'
})
export class CreateFlightComponent implements OnInit {

  flight: Flight = {
    id: 0,
    name: '',
    dateOfDeparture: '',
    distance: 0,
    price: 0,
    numberOfSeats: 0,
    from: 0,
    to: 0
  };
  destinations: Destination[];

  constructor(private flightService: FlightService, private destinationService: DestinationService) {
  }

  ngOnInit(): void {
    let getAllDestinationsRequest: ListRequest = {
      sorting: {
        fieldName: 'name',
        direction: SortDirection.Asc
      },
      pageNumber: -1
    };
    this.destinationService.getDestinationsList(getAllDestinationsRequest).then(response => this.destinations = response.destinations);
  }

  requestStatus: RequestStatus;
  requestError: string;

  onSubmit() {
    this.requestStatus = RequestStatus.PENDING;
    if (this.flight.from === this.flight.to) {
      this.requestStatus = RequestStatus.ERROR;
      this.requestError = "'To' and 'From' fields have equal values";
    } else {
      this.flightService.createFlight(this.flight).then(flight => {
        this.requestStatus = RequestStatus.OK;
        this.flight = flight;
      }).catch(err => {
        this.requestStatus = RequestStatus.ERROR;
        this.requestError = err;
        console.log(err);
      });
    }
  }
}
