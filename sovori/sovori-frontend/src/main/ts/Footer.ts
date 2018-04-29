import {find} from "./dom/find.js";
import {RecordDialog} from "./RecordDialog.js";


export class Footer {
  private addButton: HTMLElement;
  private recordDialog: RecordDialog;

  constructor(footerContainer: Element) {
    this.addButton = find<HTMLElement>(footerContainer, '.footer-add-record');
    this.recordDialog = new RecordDialog(find<HTMLDialogElement>(document.body, "#recordDialog"));

    this.initEvents();
  }

  initEvents() {
    this.addButton.addEventListener("click", evt => {
      this.recordDialog.open();
    });

    this.recordDialog.onSave((question: string, answer: string) => {

    });
  }
}