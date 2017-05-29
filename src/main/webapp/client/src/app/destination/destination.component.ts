import {Component, OnInit} from "@angular/core";
import {DestinationService} from "./destination.service";
import {Destination} from "./destination";
import {SortDirection} from "../model/sort-direction";
import {ListRequest} from "../model/list-request";
import {AuthenticationService} from "../login/authentication.service";


@Component({
  selector: 'destination',
  templateUrl: 'destination.component.html'
})
export class DestinationComponent implements OnInit {

  destinations: Destination[];

  private request: ListRequest = {
    sorting: {
      fieldName: 'id',
      direction: SortDirection.Asc
    },
    pageNumber: 0
  };

  totalPageCount: number;
  selectedDestinationId: number;

  constructor(private destinationService: DestinationService, private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.updateDestinations();
  }

  sort(sortBy: string) {
    this.setSorting(sortBy);
    this.updateDestinations();
  }

  private setSorting(sortBy: string) {

    // Check, if we just need to change the direction of sort
    if (sortBy === this.request.sorting.fieldName) {
      this.request.sorting.direction === SortDirection.Asc ? this.request.sorting.direction = SortDirection.Desc
        : this.request.sorting.direction = SortDirection.Asc;
    } else {
      this.request.sorting.fieldName = sortBy;
      this.request.sorting.direction = SortDirection.Asc;
    }
  }

  private updateDestinations() {
    this.destinationService.getDestinationsList(this.request).then(response => {
      this.totalPageCount = response.pageCount;
      this.destinations = response.destinations;
    });
  }

  isClassActive(elementName: string) {
    return this.request.sorting.fieldName === elementName;
  }

  getSortDirection() {
    return this.request.sorting.direction;
  }

  onChangeActivePage(activePage: number) {
    this.setActivePage(activePage);
    this.updateDestinations();
  }

  private setActivePage(activePage: number) {
    this.request.pageNumber = activePage;
  }

  onDeleteRequest(targetDestinationId: number) {
    this.destinationService.deleteDestination(targetDestinationId);
    // Wait 250 ms until list update, to be sure, that the operation done after delete request complete
    setTimeout(() => {
      this.updateDestinations()
    }, 250);
  }

  selectDestination(id: number) {
    this.selectedDestinationId = id;
  }

  isUserAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
