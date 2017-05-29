import {Component, OnInit} from "@angular/core";
import {Flight} from "./flight";
import {FlightService} from "./flights.service";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {Location} from "@angular/common";
import {DestinationService} from "../destination/destination.service";
import {AuthenticationService} from "../login/authentication.service";
@Component({
  selector: 'view-flight',
  templateUrl: 'view-flight.component.html'
})
export class ViewFlightComponent implements OnInit {

  flight: Flight;

  private destToName: string;
  private destFromName: string;

  constructor(private flightService: FlightService, private destinationService: DestinationService, private route: ActivatedRoute,
              private location: Location, private router: Router, private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.flightService.getFlight(+params['id']))
      .subscribe((flight: Flight) => {
        this.flight = flight;
        // Setting names for our destinations
        this.findDestinationById(<number> flight.to).then(name => this.destToName = name);
        this.findDestinationById(<number> flight.from).then(name => this.destFromName = name);
      });
  }

  private findDestinationById(id: number): Promise<string> {
    return this.destinationService.getDestination(id).then(dest => dest.name);
  }

  onDeleteRequest(targetFlightId: number) {
    this.flightService.deleteFlight(targetFlightId);
    this.router.navigate(['/flight']);
  }
  
  isUserAdmin(): boolean {
    return this.authService.isAdmin();
  }
  
  isUserLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  
}
