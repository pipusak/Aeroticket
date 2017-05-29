import {Flight} from "../flights/flight";

export interface FlightListResponse {

  pageCount: number;
  flights: Flight[];

}
