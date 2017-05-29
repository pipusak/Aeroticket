import {Component, Input, Output, EventEmitter} from "@angular/core";
@Component({
  selector: 'confirm-delete',
  templateUrl: 'confirm-delete.component.html'
})
export class ConfirmDeleteComponent {

  @Input() targetItemId: number;
  @Output() deleteRequest = new EventEmitter <number>();

  constructor() {}

  sendDeleteRequest() {
    this.deleteRequest.emit(this.targetItemId);
  }
}
