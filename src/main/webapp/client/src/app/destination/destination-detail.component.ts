/**
 * Created by Ruslan on 08.12.2016.
 */
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {Location} from "@angular/common";
import {DestinationService} from "./destination.service";
import {Destination} from "./destination";
import "rxjs/add/operator/switchMap";
import {AuthenticationService} from "../login/authentication.service";

@Component({
  selector: 'destination-detail',
  templateUrl: 'destination-detail.component.html'
})
export class DestinationDetailComponent implements OnInit {

  destination: Destination;

  constructor(private destinationService: DestinationService, private route: ActivatedRoute, private location: Location,
              private  router: Router, private authService: AuthenticationService) {

  }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.destinationService.getDestination(+params['id']))
      .subscribe((destination: Destination) => this.destination = destination);
  }

  onDeleteRequest(targetDestinationId: number) {
    this.destinationService.deleteDestination(targetDestinationId);
    this.router.navigate(['/destination']);
  }

  isUserAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
