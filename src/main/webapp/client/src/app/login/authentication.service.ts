import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {UsersService} from "../users/users.service";
import {User} from "../users/user";

@Injectable()
export class AuthenticationService {
  // TODO: test this
  private loggedIn = false;
  private admin = false;

  constructor(private http: Http, private userService: UsersService) {

    if (localStorage.getItem('cred')) {
      this.loggedIn = true;
      if (localStorage.getItem('role') === 'admins') {
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

  login(username: string, password: string): Promise<boolean> {
    // let loginSuccessfull: Promise<boolean> = this.userService.getUsersList().then(userList => {
    //   let user = this.findUserInList(userList, username, password);
    //   if (user) {
    //     this.loggedIn = true;
    //     let credentials = btoa(`${username}:${password}`);
    //     localStorage.setItem('cred', credentials);
    //
    //     this.admin = user.role === 'admins';
    //     localStorage.setItem('role', user.role);
    //     localStorage.setItem('id', user.id);
    //
    //     return true;
    //   }
    //
    //   return false;
    // }).catch(err => {
    //   return false;
    // });
    //
    // return loginSuccessfull;
    localStorage.setItem('cred', 'asd');
    localStorage.setItem('id', '1');
    this.loggedIn = true;
    if (password === 'admin') {
      localStorage.setItem('role', 'admins');
      this.admin = true;
    }
    return Promise.resolve(true);
  }

  private findUserInList(userList: User[], username: string, password: string): User {
    for (let i = 0, n = userList.length; i < n; i++) {
      let user = userList[i];
      if (username === user.login && password === user.password) {
        return user;
      }
    }
  }

  logout() {
    localStorage.removeItem('cred');
    localStorage.removeItem('id');
    localStorage.removeItem('role');
    this.admin = false;
    this.loggedIn = false;
  }
}
