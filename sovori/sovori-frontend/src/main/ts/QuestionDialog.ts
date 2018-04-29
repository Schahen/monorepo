import {find} from "./dom/find.js";
import {HtmlDialog} from "./dialog/HtmlDialog.js";

export class QuestionDialog extends HtmlDialog {

  private questionInput: HTMLInputElement;
  private closeButton: HTMLButtonElement;
  private saveButton: HTMLButtonElement;

  constructor(container: HTMLDialogElement) {
    super(container);

    this.questionInput = find<HTMLInputElement>(this.getDialogContainer(), '.question-dialog-input');
    this.closeButton = find<HTMLButtonElement>(this.getDialogContainer(), '.question-dialog-close');
    this.saveButton = find<HTMLButtonElement>(this.getDialogContainer(), '.question-dialog-save');

    this.initEvents();
  }

  initEvents() {
    this.closeButton.addEventListener("click", evt => {
      this.close();
    });
  }

  onSave(handler: (question: string) => void) {
    this.saveButton.addEventListener("click", evt => {
      handler(this.questionInput.value);
    });
  }


  setQuestion(question: string) {
    this.questionInput.value = question;
  }

}