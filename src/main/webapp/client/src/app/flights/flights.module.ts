// Core
import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";
// Components
import {FlightsComponent} from "./flights.component";
import {CreateFlightComponent} from "./create-flight.component";
import {ViewFlightComponent} from "./view-flight.component";
import {UpdateFlightComponent} from "./update-flight.component";
import {AuthenticationAdminGuard} from "../login/authentication-admin.guard";

@NgModule({
  imports: [SharedModule,
    RouterModule.forChild([
      {
        path: 'flight/create',
        component: CreateFlightComponent,
        canActivate: [AuthenticationAdminGuard]
      },
      {
        path: 'flight/:id/edit',
        component: UpdateFlightComponent,
        canActivate: [AuthenticationAdminGuard]
      },
      {
        path: 'flight/:id',
        component: ViewFlightComponent
      },
      {
        path: "flight",
        component: FlightsComponent
      }
    ])],
  declarations: [FlightsComponent, CreateFlightComponent, ViewFlightComponent, UpdateFlightComponent]
})
export class FlightsModule {}
