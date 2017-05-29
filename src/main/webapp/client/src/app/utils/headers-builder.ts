import {Headers} from "@angular/http";
/**
 * Created by Ruslan on 18.12.2016.
 */
export class HeadersBuilder {

  private headers: Headers;

  private constructor() {
    this.headers = new Headers();
  }

  static newBuilder(): HeadersBuilder {
    return new HeadersBuilder().conentTypeHeaders();
  }

  build(): Headers {
    return this.headers;
  }

   private conentTypeHeaders(): HeadersBuilder {
    this.headers.append('Accept', 'application/json');
    this.headers.append('Content-Type', 'application/json');

    return this;
  }

  basicAuthorizationHeader(credentials: string): HeadersBuilder {
    this.headers.append('Authorization', `Basic ${credentials}`);

    return this;
  }

}
