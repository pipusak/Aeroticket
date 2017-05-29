import {NgModule} from "@angular/core";
import {AuthenticationAdminGuard} from "./authentication-admin.guard";
import {AuthenticationGuard} from "./authentication.guard";
import {AuthenticationService} from "./authentication.service";
import {RouterModule} from "@angular/router";
import {AuthenticationComponent} from "./authentication.component";
import {SharedModule} from "../shared/shared.module";
import {UsersService} from "../users/users.service";
@NgModule({
  imports: [SharedModule,
    RouterModule.forChild([
      {
        path: 'login',
        component: AuthenticationComponent
      }
    ])],
  declarations: [AuthenticationComponent],
  providers: [AuthenticationService, AuthenticationGuard, AuthenticationAdminGuard, UsersService],
})
export class AuthenticationModule {

}
