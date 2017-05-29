import {Injectable} from "@angular/core";
import {AuthenticationService} from "./authentication.service";
import {Router} from "@angular/router";
@Injectable()
export class AuthenticationAdminGuard {

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  canActivate() {
    if (this.authService.isLoggedIn() && this.authService.isAdmin()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;

  }
}
