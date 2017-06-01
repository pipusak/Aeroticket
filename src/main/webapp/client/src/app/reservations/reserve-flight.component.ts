import {Component, OnInit} from "@angular/core";
import {ReservationsService} from "./reservations.service";
import {FlightService} from "../flights/flights.service";
import {Flight} from "../flights/flight";
import {Params, ActivatedRoute} from "@angular/router";
import {AuthenticationService} from "../login/authentication.service";
import {RequestStatus} from "../shared/request-status";
import {DestinationService} from "../destination/destination.service";
@Component({
  templateUrl: 'reserve-flight.component.html',
  selector: 'reserve-flight'
})
export class ReserveFlightComponent implements OnInit {

  private targetFlight: Flight;
  private destToName: string;
  private destFromName: string;

  requestStatus: RequestStatus;
  requestError: string;


  constructor(private reservationService: ReservationsService, private flightService: FlightService, private destinationService: DestinationService,
              private authService: AuthenticationService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.flightService.getFlight(+params['id']))
      .subscribe((flight: Flight) => {
        this.targetFlight = flight;
        // Setting names for our destinations
        this.findDestinationById(<number> flight.to).then(name => this.destToName = name);
        this.findDestinationById(<number> flight.from).then(name => this.destFromName = name);
      });
  }

  private findDestinationById(id: number): Promise<string> {
    return this.destinationService.getDestination(id).then(dest => dest.name);
  }

  onSubmit(passengerType: string,numberOfTickets: number) {
    this.requestStatus = RequestStatus.PENDING;
    let clientId = this.authService.getUserId();

    if(numberOfTickets<1){
      try {
        throw new RangeError(" Ticket number must be at least 1");
      }
      catch (err){
        this.requestStatus = RequestStatus.ERROR;
        this.requestError = err;
        console.log(err);
      }

    }
    console.log(passengerType)

    this.reservationService.createReservation(clientId, passengerType, numberOfTickets, this.targetFlight.id).then(res => {
      this.requestStatus = RequestStatus.OK;
    }).catch(err => {
      this.requestStatus = RequestStatus.ERROR;
      this.requestError = err;
      console.log(err);
    });
  }

}
