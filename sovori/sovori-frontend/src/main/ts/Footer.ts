import {find} from "./dom/find.js";
import {RecordDialog} from "./RecordDialog.js";


export class Footer {
  private addButton: HTMLElement;

  constructor(footerContainer: Element) {
    this.addButton = find<HTMLElement>(footerContainer, '.footer-add-record');

    this.initEvents();
  }

  initEvents() {
    this.addButton.addEventListener("click", evt => {
      let recordDialog = new RecordDialog(find<HTMLDialogElement>(document.body, "#recordDialog"));
      recordDialog.open();
    });
  }
}