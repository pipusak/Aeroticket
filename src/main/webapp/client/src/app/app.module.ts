import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {AppComponent} from "./app.component";
import {HomeComponent} from "./home/home.component";
import {DestinationModule} from "./destination/destination.module";
import {FlightsModule} from "./flights/flights.module";
import {AuthenticationModule} from "./login/authentication.module";
import {ReservationsModule} from "./reservations/reservations.module";


@NgModule({
  imports: [BrowserModule, AuthenticationModule,
    DestinationModule,
    FlightsModule,
    ReservationsModule,
    RouterModule.forRoot([
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: '/home'
      }
    ]),
  ],
  declarations: [AppComponent, HomeComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
