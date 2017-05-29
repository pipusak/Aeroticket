import {Injectable} from "@angular/core";
import {Destination} from "./destination";
import {Http, RequestOptions, URLSearchParams} from "@angular/http";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/map";
import "rxjs/add/operator/delay";
import {HeadersBuilder} from "../utils/headers-builder";
// Constants
import {serverAddress} from "../constants/server-address";
import {SortDirection} from "../model/sort-direction";
import {ListRequest} from "../model/list-request";
import {DestinationListResponse} from "../model/destination-list-response";
import {defaultListRequest} from "../constants/default-list-request";
import {AuthenticationService} from "../login/authentication.service";

@Injectable()
export class DestinationService {

  private serverEndpoint = '/destination';

  constructor(private http: Http, private authService: AuthenticationService) {
  }

  getDestinationsList(request: ListRequest = defaultListRequest, delay: number = 500): Promise<DestinationListResponse> {

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
      .then(response => response.json() as DestinationListResponse)
      .catch(this.handleError);
  }

  getDestination(id: number): Promise<Destination> {
    let headers = HeadersBuilder.newBuilder().build();
    const requestUrl = `${serverAddress}${this.serverEndpoint}/${id}`;
    let options = new RequestOptions({headers: headers});
    return this.http.get(requestUrl, options).toPromise().then(response => response.json() as Destination)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error("Error occurred in DestinationService while sending HTTP request", error);
    return Promise.reject(error.message || error);
  }

  createDestination(name: string, latitude: number, longitude: number): Promise<Destination> {
    let credentials = this.authService.getCredentials();
    if (!credentials) {
      throw new Error("Lack of credentials in CREATE operation for Destination service");
    }
    let headers = HeadersBuilder.newBuilder().basicAuthorizationHeader(credentials).build();

    let requestBody = JSON.stringify(new Destination(name, latitude, longitude));
    const requestUrl = `${serverAddress}${this.serverEndpoint}`;
    let options = new RequestOptions({headers: headers});

    return this.http.post(requestUrl, requestBody, options).toPromise().then(response => response.json() as Destination)
      .catch(this.handleError);
  }

  updateDestination(newDestination: Destination): Promise<Destination> {
    let credentials = this.authService.getCredentials();
    if (!credentials) {
      throw new Error("Lack of credentials in UPDATE operation for Destination service");
    }
    let headers = HeadersBuilder.newBuilder().basicAuthorizationHeader(credentials).build();
    let options = new RequestOptions({headers: headers});

    const requestUrl = `${serverAddress}${this.serverEndpoint}/${newDestination.id}`;
    let requestBody = JSON.stringify(newDestination);

    return this.http.put(requestUrl, requestBody, options).toPromise().then(response => response.json() as Destination)
      .catch(this.handleError);
  }

  deleteDestination(id: number): void {
    let credentials = this.authService.getCredentials();
    if (!credentials) {
      throw new Error("Lack of credentials in DELETE operation for Destination Service");
    }
    let headers = HeadersBuilder.newBuilder().basicAuthorizationHeader(credentials).build();
    let options = new RequestOptions({headers: headers});

    const requestUrl = `${serverAddress}${this.serverEndpoint}/${id}`;

    this.http.delete(requestUrl, options).toPromise().catch(this.handleError);
  }
}

