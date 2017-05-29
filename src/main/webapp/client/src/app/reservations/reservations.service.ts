import {Injectable} from "@angular/core";
import {Reservation} from "./reservation";
import {ListRequest} from "../model/list-request";
import {defaultListRequest} from "../constants/default-list-request";
import {URLSearchParams, RequestOptions, Http} from "@angular/http";
import {SortDirection} from "../model/sort-direction";
import {HeadersBuilder} from "../utils/headers-builder";
import {serverAddress} from "../constants/server-address";

@Injectable()
export class ReservationsService {

  private serverEndpoint = "/reservation";

  constructor(private http: Http) {
  }

  getReservationsList(request: ListRequest = defaultListRequest, delay: number = 500): Promise<Reservation[]> {

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
      .then(response => response.json() as Reservation[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error("Error occurred in ReservationService while sending HTTP request", error);
    return Promise.reject(error.message || error);
  }

  createReservation(clientId: number, passengerType: number, flightId: number) {
    let headers = HeadersBuilder.newBuilder().build();

    let reservationRequest = this.createReservationRequestObject(clientId, passengerType, flightId);
    let requestBody = JSON.stringify(reservationRequest);

    let requestOptions = new RequestOptions({headers: headers});

    return this.http.post(`${serverAddress}${this.serverEndpoint}`, requestBody, requestOptions).toPromise().catch(this.handleError);
  }

  private createReservationRequestObject(clientId: number, passengerType: number, flightId: number): Object {
    let passenger;
    switch (passengerType) {
      case 0:
        passenger = 'BABY';
        break;
      case 1:
        passenger = 'CHILD';
        break;
      case 2:
        passenger = 'STUDENT';
        break;
      case 3:
        passenger = 'ADULT';
        break;
      case 4:
        passenger = 'SENIOR';
        break;
    }

    let reservationRequestObject = {
      client: clientId,
      reservationStatus: 'NEW',
      reservationItems: [
        {
          passengerType: passenger,
          numberOfTickets: 1,
          flight: flightId
        }
      ]
    }
    return reservationRequestObject;
  }

  cancelReservation() {

  }
}
