import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {RequestStatusNotificationComponent} from "./request-status-notification.component";
import {PaginationComponent} from "./pagination.component";
import {DestinationService} from "../destination/destination.service";
import {ConfirmDeleteComponent} from "./confirm-delete.component";
import {FlightService} from "../flights/flights.service";
@NgModule({
  imports: [CommonModule, HttpModule, FormsModule],
  declarations: [RequestStatusNotificationComponent, PaginationComponent, ConfirmDeleteComponent],
  exports: [CommonModule, FormsModule, RequestStatusNotificationComponent, PaginationComponent, ConfirmDeleteComponent],
  providers: [FlightService, DestinationService]
})
export class SharedModule {
}
