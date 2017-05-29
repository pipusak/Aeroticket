/**
 * Created by Ruslan on 09.12.2016.
 */
import {Component} from "@angular/core";
import {DestinationService} from "./destination.service";
import {RequestStatus} from "../shared/request-status";
@Component({
  selector: 'create-destination',
  templateUrl: 'create-destination.component.html',
  styleUrls: ['../shared/request-status-notification.component.css']
})
export class CreateDestinationComponent {

  requestStatus: RequestStatus;
  requestError: string;

  constructor(private service: DestinationService) {
  }


  createDestination(name: string, lat: number, lon: number) {
    this.requestStatus = RequestStatus.PENDING;

    this.service.createDestination(name, lat, lon).then(dest => {
      this.requestStatus = RequestStatus.OK;
    }).catch(err => {
      this.requestStatus = RequestStatus.ERROR;
      this.requestError = err;
      console.log(err);
    });
  }
}
