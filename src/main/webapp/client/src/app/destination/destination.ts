/**
 * Created by Ruslan on 24.11.2016.
 */
export class Destination {

  id: number;
  name: string;
  latitude: number;
  longitude: number;

  constructor(name: string, latitude: number, longitude: number) {
    this.name = name;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
