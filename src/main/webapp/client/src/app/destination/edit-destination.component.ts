/**
 * Created by Ruslan on 15.12.2016.
 */
import {Component, OnInit} from "@angular/core";
import {Destination} from "./destination";
import {DestinationService} from "./destination.service";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {Location} from "@angular/common";
import {RequestStatus} from "../shared/request-status";

@Component({
  selector: 'edit-destination',
  templateUrl: 'edit-destination.component.html'
})
export class EditDestinationComponent implements OnInit {

  destination: Destination;

  requestStatus: RequestStatus;

  constructor(private destinationService: DestinationService, private route: ActivatedRoute, private location: Location,
              private  router: Router) {
  }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.destinationService.getDestination(+params['id']))
      .subscribe((destination: Destination) => this.destination = destination);

  }

  updateDestination(): void {
    this.requestStatus = RequestStatus.PENDING;
    this.destinationService.updateDestination(this.destination).then((dest) => {
      this.requestStatus = RequestStatus.OK;
      this.destination = dest;
    }).catch((err) => {
      this.requestStatus = RequestStatus.ERROR;
      console.log(`Error is: ${err}`)
    });
  }
}
