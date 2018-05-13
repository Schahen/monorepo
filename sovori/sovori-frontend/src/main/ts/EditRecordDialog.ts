import {find} from "./dom/find.js";
import {HtmlDialog} from "./dialog/HtmlDialog.js";
import {StackedEvent} from "./events/StackedEvent.js";
import {RegisteredEvent} from "./events/RegisteredEvent.js";

export type EditRecordData = {
  question: string
}

export class EditRecordDialog extends HtmlDialog {

  private questionInput: HTMLInputElement;
  private closeButton: HTMLButtonElement;
  private saveButton: HTMLButtonElement;

  private submitEvent: RegisteredEvent<EditRecordData> = new StackedEvent();

  constructor(container: HTMLDialogElement) {
    super(container);

    this.questionInput = find<HTMLInputElement>(this.getDialogContainer(), '.question-dialog-input');
    this.closeButton = find<HTMLButtonElement>(this.getDialogContainer(), '.question-dialog-close');
    this.saveButton = find<HTMLButtonElement>(this.getDialogContainer(), '.question-dialog-save');

    this.initEvents();
  }

  initEvents() {
    this.questionInput.addEventListener("keypress", evt => {
      if (evt.code == "Enter") {
        this.save();
      }
    });

    this.closeButton.addEventListener("click", evt => {
      this.close();
    });

    this.saveButton.addEventListener("click", evt => {
      this.save();
    });

    this.openEvent.on(() => {
      this.questionInput.focus();
    });
  }

  save() {
    this.submitEvent.trigger({
      question: this.questionInput.value
    });

  }

  onSave(handler: (record: EditRecordData) => void) {
    this.submitEvent.on(record => {
      handler(record);
    });
  }

  setQuestion(question: string) {
    this.questionInput.value = question;
  }

}