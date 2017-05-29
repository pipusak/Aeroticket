import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";
import {ReservationsService} from "./reservations.service";
import {AuthenticationAdminGuard} from "../login/authentication-admin.guard";
import {ReservationsComponent} from "./reservations.component";
import {AuthenticationGuard} from "../login/authentication.guard";
import {ReserveFlightComponent} from "./reserve-flight.component";
import {MyReservationsComponent} from "./my-reservations.component";
@NgModule({
  imports: [SharedModule,
    RouterModule.forChild([
      {
        path: 'reservations',
        component: ReservationsComponent,
        canActivate: [AuthenticationAdminGuard]
      },
      {
        path: 'reserve/:id',
        component: ReserveFlightComponent,
        canActivate: [AuthenticationGuard]
      },
      {
        path: 'myreservations',
        component: MyReservationsComponent,
        canActivate: [AuthenticationGuard]
      }
    ])],
  declarations: [ReservationsComponent, ReserveFlightComponent, MyReservationsComponent],
  providers: [ReservationsService]
})
export class ReservationsModule {
}
