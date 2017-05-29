import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {DestinationComponent} from "./destination.component";
import {DestinationDetailComponent} from "./destination-detail.component";
import {CreateDestinationComponent} from "./create-destination.component";
import {EditDestinationComponent} from "./edit-destination.component";
import {SharedModule} from "../shared/shared.module";
import {AuthenticationAdminGuard} from "../login/authentication-admin.guard";
@NgModule({
  imports: [SharedModule,
    RouterModule.forChild([
      {
        path: 'destination/create',
        component: CreateDestinationComponent,
        canActivate: [AuthenticationAdminGuard]
      },
      {
        path: 'destination/:id/edit',
        component: EditDestinationComponent,
        canActivate: [AuthenticationAdminGuard]
      },
      {
        path: 'destination/:id',
        component: DestinationDetailComponent
      },
      {
        path: 'destination',
        component: DestinationComponent
      }
    ])
  ],
  declarations: [DestinationComponent, DestinationDetailComponent, CreateDestinationComponent, EditDestinationComponent]
})
export class DestinationModule {
}
