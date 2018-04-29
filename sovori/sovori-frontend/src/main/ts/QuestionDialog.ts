import {find} from "./dom/find";

export class QuestionDialog {

  private container: HTMLDialogElement;
  private questionInput: HTMLInputElement;
  private closeButton: HTMLButtonElement;
  private saveButton: HTMLButtonElement;

  constructor(container: HTMLDialogElement) {
    this.container = container;
    this.questionInput = find<HTMLInputElement>(this.container, '.question-dialog-input');
    this.closeButton = find<HTMLButtonElement>(this.container, '.question-dialog-close');
    this.saveButton = find<HTMLButtonElement>(this.container, '.question-dialog-save');

    this.initEvents();
  }

  initEvents() {
    this.closeButton.addEventListener("click", evt => {
      this.close();
    });
    }

   onSave(handler: (question: string) => void ) {
     this.saveButton.addEventListener("click", evt => {
       handler(this.questionInput.value);
     });
   }

  close() {
    this.container.open = false;
  }

  open() {
    this.container.open = true;
  }

  setQuestion(question: string) {
    this.questionInput.value = question;
  }

}