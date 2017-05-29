import {UserRoles} from "./user-roles";
export class User {
  id: number;
  login: string;
  role: UserRoles;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  dateOfBirth: string;

  constructor(login: string, email: string, firstName: string, lastName: string, password:string, dateOfBirth: string) {
    this.login = login;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.password = password;

    this.role = 'guest';
  }
}
