import {find} from "./dom/find.js";
import {AddRecordData, AddRecordDialog} from "./AddRecordDialog.js";
import {StackedEvent} from "./events/StackedEvent.js";
import {RegisteredEvent} from "./events/RegisteredEvent.js";


export class Footer {
  private addButton: HTMLElement;
  private recordDialog: AddRecordDialog;
  private submitEvent: RegisteredEvent<AddRecordData> = new StackedEvent();

  constructor(footerContainer: Element) {
    this.addButton = find<HTMLElement>(footerContainer, '.footer-add-record');
    this.recordDialog = new AddRecordDialog(find<HTMLDialogElement>(document.body, "#recordDialog"));

    this.initEvents();
  }

  initEvents() {
    this.addButton.addEventListener("click", evt => {
      this.recordDialog.open();
    });

    this.recordDialog.getSubmitEvent().delegate(this.submitEvent);
  }

  getAddRecordEvent() {
    return this.submitEvent;
  }
}