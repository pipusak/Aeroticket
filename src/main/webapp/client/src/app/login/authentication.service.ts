import {Injectable} from "@angular/core";
import {Http, RequestOptions} from "@angular/http";
import {UsersService} from "../users/users.service";
import {User} from "../users/user";
import {HeadersBuilder} from "../utils/headers-builder";
import {serverAddress} from "../constants/server-address";

@Injectable()
export class AuthenticationService {
  // TODO: test this
  private loggedIn = false;
  private admin = false;
  private serverEndpoint = '/authentification';
  private role = "NONE";
  private id;
  private response;


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

  login(email: string, password: string): Promise<boolean> {


    let headers = HeadersBuilder.newBuilder().build();

    let authentificationRequest = {
      email: email,
      password: password
    }
    let requestBody = JSON.stringify(authentificationRequest);

    let requestOptions = new RequestOptions({headers: headers});

    this.http.post(`${serverAddress}${this.serverEndpoint}`, requestBody, requestOptions).toPromise().then(response => this.response=response.json()).catch(this.handleError);

        this.loggedIn = true;
        let credentials = btoa(`${email}:${password}`);
         localStorage.setItem('cred', credentials);

    this.loggedIn = true;
    if (this.response.role === 'ADMIN') {

      this.admin = true;
    }
        localStorage.setItem('role', this.response.role);
        localStorage.setItem('id',  this.response.id);



    return Promise.resolve(true);
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
