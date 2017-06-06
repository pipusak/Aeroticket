import {UserRoles} from "./user-roles";
export class User {
  id: number;
  role: UserRoles;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  dateOfBirth: string;

  constructor( email: string, firstName: string, lastName: string, password:string, dateOfBirth: string) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.password = password;

    this.role = 'guest';
  }
}
