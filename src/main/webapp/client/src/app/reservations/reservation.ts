import {ReservationStatus} from "./reservation-status";
import {ReservationItem} from "./reservation-item";
export class Reservation {

  id: number;
  client: number;
  created: string;
  reservationStatus: ReservationStatus;
  price: number;
  reservationItems: ReservationItem[];
}
