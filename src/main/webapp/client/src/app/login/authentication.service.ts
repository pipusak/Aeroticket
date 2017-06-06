import {Injectable} from "@angular/core";
import {Http, RequestOptions} from "@angular/http";
import {UsersService} from "../users/users.service";
import {User} from "../users/user";
import {HeadersBuilder} from "../utils/headers-builder";
import {serverAddress} from "../constants/server-address";

@Injectable()
export class AuthenticationService {

  private loggedIn = false;
  private admin = false;
  private serverEndpoint = '/login';
  private role = "NONE";
  private id;



  constructor(private http: Http, private userService: UsersService) {

    if (localStorage.getItem('cred')) {
      this.loggedIn = true;
      if (localStorage.getItem('role') === 'ADMIN') {
        this.admin = true;
      }
    }
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  isAdmin(): boolean {
    return this.admin;
  }

  // Note: credentials are in encoded form
  getCredentials(): string {
    return localStorage.getItem('cred');
  }

  getUserId(): number {
    return +localStorage.getItem('id');
  }

  login(email: string, password: string, ): Promise<boolean> {

    return this.getAuthentifivation(email,password).then(response=>this.fillVars(response)).catch(this.handleError);
  }

  fillVars( authentificationObject ):Promise<boolean>{
    console.log("FILL Vars")
    this.loggedIn = true;
    let credentials = btoa("fakecred");
    localStorage.setItem('cred', credentials);

    this.loggedIn = true;
    if (authentificationObject.role === 'ADMIN') {

      this.admin = true;
    }
    localStorage.setItem('role', authentificationObject.role);
    localStorage.setItem('id',  authentificationObject.id);

  return Promise.resolve(true);
  }





  getAuthentifivation(email: string, password: string, delay: number = 500){
    console.log("Start login");
    let headers = HeadersBuilder.newBuilder().build();

    let authentificationRequest = {
      email: email,
      password: password
    }
    let requestBody = JSON.stringify(authentificationRequest);

    let requestOptions = new RequestOptions({headers: headers});

    var requestUrl = "" + serverAddress + this.serverEndpoint;
   return this.http.post(requestUrl, requestBody, requestOptions).delay(delay).toPromise().then(response => response.json()).catch(this.handleError);

  }

  logout() {
    localStorage.removeItem('cred');
    localStorage.removeItem('id');
    localStorage.removeItem('role');
    this.admin = false;
    this.loggedIn = false;
  }

  private handleError(error: any): Promise<any> {
    console.error("Incorrect credentials", error);
    return Promise.reject(error.message || error);
  }
}
