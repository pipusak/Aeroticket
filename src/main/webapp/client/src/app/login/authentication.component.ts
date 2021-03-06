import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthenticationService} from "./authentication.service";
import {User} from "../users/user";
import {UsersService} from "../users/users.service";

@Component({
  templateUrl: 'authentication.component.html',
  selector: 'authentication',
  styleUrls: ['authentication.component.css']

})
export class AuthenticationComponent implements OnInit {

  loginError: string;
  registrationError: string;

  constructor(private authService: AuthenticationService, private userService: UsersService, private router: Router) {
  }

  // Logout user after it is redirected here (the only way is to click logout)
  ngOnInit() {
    this.authService.logout();
  }

  onLoginSubmit(email: string, password: string) {
    this.authService.login(email, password).then(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigate(['/']);
      } else {
        this.loginError = "Incorrect username or password.";
      }
    }).catch( reject =>this.loginError = "Incorrect username or password.");

  }

  onRegisterSubmit(  email: string, fullName: string, password: string, passwordConfirm: string, dateOfBirth: string) {
    console.log("CALL on Register")
    if (password === passwordConfirm) {
      let parsedName = fullName.split(' ');
      if (parsedName.length === 2) {
        let newUser = new User( email, parsedName[0], parsedName[1], password, dateOfBirth);
        // Redirect to flights on success or display error message
        this.userService.createUser(newUser).then(user => this.router.navigate(['/login'])).catch(err => this.loginError = "Internal error");
      } else {
        this.registrationError = "Invalid infromations";
      }
    } else {
      this.registrationError = "Password doesn't match.";
    }
  }
}
