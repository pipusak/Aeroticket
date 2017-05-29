import {Injectable} from "@angular/core";
import {Http, URLSearchParams, RequestOptions} from "@angular/http";
import {User} from "./user";
import {defaultListRequest} from "../constants/default-list-request";
import {ListRequest} from "../model/list-request";
import {SortDirection} from "../model/sort-direction";
import {HeadersBuilder} from "../utils/headers-builder";
import {serverAddress} from "../constants/server-address";

@Injectable()
export class UsersService {

  private serverEndpoint = '/client';

  constructor(private http: Http) {
  }

  getUsersList(request: ListRequest = defaultListRequest, delay: number = 500): Promise<User[]> {
    // Setting URL query string
    let params: URLSearchParams = new URLSearchParams();

    // Determine sort type
    let sortParameters = request.sorting;
    if (sortParameters) {
      params.set('orderBy', sortParameters.fieldName);
      params.set('order', sortParameters.direction === SortDirection.Asc ? 'asc' : 'desc');
    }

    // Setting page for request
    params.set('page', request.pageNumber.toString());

    // Setting request headers
    let headers = HeadersBuilder.newBuilder();

    let options = new RequestOptions({headers: headers.build(), search: params});
    return this.http.get(`${serverAddress}${this.serverEndpoint}`, options).delay(delay).toPromise()
      .then(response => response.json() as User[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error("Error occurred in UserService while sending HTTP request", error);
    return Promise.reject(error.message || error);
  }

  createUser(newUser: User): Promise<User> {
    const requestUrl = `${serverAddress}${this.serverEndpoint}`;
    let headers = HeadersBuilder.newBuilder().build();
    let requestBody = JSON.stringify(newUser);
    let requestOptions = new RequestOptions({headers: headers});

    return this.http.post(requestUrl, requestBody, requestOptions).toPromise().then(res => res.json() as User)
      .catch(this.handleError);
  }
}
