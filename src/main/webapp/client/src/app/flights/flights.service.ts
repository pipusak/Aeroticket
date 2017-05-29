/**
 * Created by Ruslan on 28.12.2016.
 */
import {Injectable} from "@angular/core";
import {Http, RequestOptions, URLSearchParams} from "@angular/http";
import {Flight} from "./flight";
import {HeadersBuilder} from "../utils/headers-builder";
import {serverAddress} from "../constants/server-address";
import {ListRequest} from "../model/list-request";
import {SortDirection} from "../model/sort-direction";
import {FlightListResponse} from "../model/flight-list-response";
import {defaultListRequest} from "../constants/default-list-request";
import {AuthenticationService} from "../login/authentication.service";

@Injectable()
export class FlightService {

  private serverEndpoint = "/flight";

  constructor(private http: Http, private authService: AuthenticationService) {
  }

  getFlightsList(request: ListRequest = defaultListRequest, delay: number = 500): Promise<FlightListResponse> {

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
      .then(response => response.json() as FlightListResponse)
      .catch(this.handleError);
  }

  createFlight(newFlight: Flight): Promise<Flight> {
    const requestUrl = `${serverAddress}${this.serverEndpoint}`;

    return this.sendCreateFlightRequest(requestUrl, 'POST', newFlight);
  }

  getFlight(id: number): Promise<Flight> {
    let headers = HeadersBuilder.newBuilder().build();
    const requestUrl = `${serverAddress}${this.serverEndpoint}/${id}`;
    let options = new RequestOptions({headers: headers});

    return this.http.get(requestUrl, options).toPromise().then(res => res.json() as Flight).catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error("Error occurred in FlightService while sending HTTP request", error);
    return Promise.reject(error.message || error);
  }

  updateFlight(id: number, newFlight: Flight): Promise<Flight> {
    const requestUrl = `${serverAddress}${this.serverEndpoint}/${id}`;

    return this.sendCreateFlightRequest(requestUrl, 'PUT', newFlight);
  }

  private sendCreateFlightRequest(requestUrl: string, method: string, newFlight: Flight): Promise<Flight> {
    let credentials = this.authService.getCredentials();
    if (!credentials) {
      throw new Error("Lack of credentials in CREATE/UPDATE operation");
    }
    let headers = HeadersBuilder.newBuilder().basicAuthorizationHeader(credentials).build();

    // Generating request body using our transformed date
    newFlight.dateOfDeparture = this.transformToSQLTimestamp(newFlight.dateOfDeparture);

    let requestBody = JSON.stringify(newFlight);
    let requestOptions = new RequestOptions({headers: headers});
    if (method === 'PUT') {
      return this.http.put(requestUrl, requestBody, requestOptions).toPromise().then(res => res.json() as Flight)
        .catch(this.handleError);
    }
    if (method === 'POST') {
      return this.http.post(requestUrl, requestBody, requestOptions).toPromise().then(res => res.json() as Flight)
        .catch(this.handleError);
    }

    return Promise.reject("Request method is neither PUT nor POST");
  }

  // We are getting input in yyyy-mm-ddThh:mm format
  private transformToSQLTimestamp(htmlDate: string): string {
    // Appending seconds (:ss), ms (.SSS) and timezone (Z)
    return htmlDate.concat(":00.000+0200");
  }

  deleteFlight(flightId: number) {
    let credentials = this.authService.getCredentials();
    if (!credentials) {
      throw new Error("Lack of credentials in CREATE/UPDATE operation");
    }
    let headers = HeadersBuilder.newBuilder().basicAuthorizationHeader(credentials).build();

    let options = new RequestOptions({headers: headers});

    const requestUrl = `${serverAddress}${this.serverEndpoint}/${flightId}`;

    this.http.delete(requestUrl, options).toPromise().catch(this.handleError);
  }
}
