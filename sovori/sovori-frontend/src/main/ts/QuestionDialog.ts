
export class QuestionDialog {

  private container: HTMLDialogElement;
  private questionInput: HTMLInputElement;
  private closeButton: HTMLButtonElement;

  constructor(container: HTMLDialogElement) {
    this.container = container;
    this.questionInput = <HTMLInputElement>this.container.querySelector('.question-dialog-input');
    this.closeButton = <HTMLButtonElement>this.container.querySelector('.question-dialog-close');


    this.initEvents();
  }

  initEvents() {
    this.closeButton.addEventListener("click", evt => {
      this.close();
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