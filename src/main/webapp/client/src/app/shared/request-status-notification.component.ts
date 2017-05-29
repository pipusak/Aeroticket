import {Component, Input} from "@angular/core";
import {RequestStatus} from "./request-status";
@Component({
  selector: 'request-status-notification',
  templateUrl: 'request-status-notification.component.html',
  styleUrls: ['request-status-notification.component.css']
})
export class RequestStatusNotificationComponent {

  @Input() requestStatus: RequestStatus;

  getRequestStatusList(): any {
    return RequestStatus;
  }
}
