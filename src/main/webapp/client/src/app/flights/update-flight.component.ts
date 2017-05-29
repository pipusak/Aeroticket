import {Flight} from "./flight";
import {Component, OnInit} from "@angular/core";
import {RequestStatus} from "../shared/request-status";
import {DestinationService} from "../destination/destination.service";
import {FlightService} from "./flights.service";
import {ActivatedRoute, Params} from "@angular/router";
import {ListRequest} from "../model/list-request";
import {SortDirection} from "../model/sort-direction";
import {Destination} from "../destination/destination";
@Component({
    templateUrl: 'update-flight.component.html',
    selector: 'update-flight'
})
export class UpdateFlightComponent implements OnInit {

    flight: Flight;
    destinations: Destination[];
    requestStatus: RequestStatus;


    constructor(private flightService: FlightService, private destinationService: DestinationService,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        // Setting our flight
        this.route.params
            .switchMap((params: Params) => this.flightService.getFlight(+params['id']))
            .subscribe((flight: Flight) => {
                this.flight = flight;

                // Timezone is not supported by HTML input datetime-local, so remove for ex. :00.000+0800 (12 symbols) from string
                this.flight.dateOfDeparture = this.flight.dateOfDeparture.slice(0, -12);
            });

        // Getting list of destionations
        let getAllDestinationsRequest: ListRequest = {
            sorting: {
                fieldName: 'name',
                direction: SortDirection.Asc
            },
            pageNumber: -1
        };
        this.destinationService.getDestinationsList(getAllDestinationsRequest).then(response => this.destinations = response.destinations);
    }

    onSubmit() {
        this.requestStatus = RequestStatus.PENDING;
        if (this.flight.from === this.flight.to) {
            this.requestStatus = RequestStatus.ERROR;
        } else {
            this.flightService.updateFlight(this.flight.id, this.flight).then(flight => {
                this.requestStatus = RequestStatus.OK;
                this.flight = flight;
            }).catch(err => {
                this.requestStatus = RequestStatus.ERROR;
            });
        }
    }


}
