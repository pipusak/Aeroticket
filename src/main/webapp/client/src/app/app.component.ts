import {Component} from "@angular/core";
import {AuthenticationService} from "./login/authentication.service";

@Component({
  selector: 'airline-service-app',
  templateUrl: 'app.component.html',
  }
)
export class AppComponent  {

  constructor(private authService: AuthenticationService) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}

