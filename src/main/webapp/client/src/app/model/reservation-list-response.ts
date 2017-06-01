import {Reservation} from "../reservations/reservation";
export interface ReservationListResponse {

  pageCount: number;
  reservations: Reservation[];
}
