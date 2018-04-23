
export class QuestionDialog {

  private container: HTMLDialogElement;
  private questionInput: HTMLInputElement;

  constructor(container: HTMLDialogElement) {
    this.container = container;
  }

  open() {
    this.container.open = true;
    this.questionInput = <HTMLInputElement>this.container.querySelector('.question-dialog-input');
  }

  setQuestion(question: string) {
    this.questionInput.value = question;
  }

}