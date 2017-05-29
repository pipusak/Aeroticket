import {Component, Input, EventEmitter, Output, OnInit} from "@angular/core";

@Component({
  selector: 'pagination',
  templateUrl: 'pagination-component.html'
})
export class PaginationComponent implements OnInit {

  // TODO: fix bug with deleting items and pagination. Possible decision: Observables.
  // TODO: fix bug and block request sending on disabled elements

  @Input()
  totalPageCount: number;

  @Output()
  changeActivePage = new EventEmitter<number>();

  pages: number[];
  activePage: number;

  ngOnInit(): void {
    this.setPagesArray(this.totalPageCount);
    this.activePage = 0;
  }

  setPagesArray(arrayLength: number) {
    this.pages = Array(arrayLength).fill(0).map((x: number, i: number) => i);
  }

  setActivePage(page: number) {
    if (page > this.totalPageCount - 1) {
      page = this.totalPageCount - 1;
    }
    if (page < 0) {
      page = 0;
    }
    this.activePage = page;
    this.changeActivePage.emit(page);
  }

  hasNextPage(): boolean {
    return this.activePage < this.totalPageCount - 1;
  }
}
