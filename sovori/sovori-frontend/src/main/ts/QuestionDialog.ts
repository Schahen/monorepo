

export class QuestionDialog {

  private container: HTMLDialogElement;
  private questionInput: HTMLInputElement;
  private closeButton: HTMLButtonElement;
  private saveButton: HTMLButtonElement;

  constructor(container: HTMLDialogElement) {
    this.container = container;
    this.questionInput = <HTMLInputElement>this.container.querySelector('.question-dialog-input');
    this.closeButton = <HTMLButtonElement>this.container.querySelector('.question-dialog-close');
    this.saveButton = <HTMLButtonElement>this.container.querySelector('.question-dialog-save');

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