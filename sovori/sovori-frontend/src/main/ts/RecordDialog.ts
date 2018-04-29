import {HtmlDialog} from "./dialog/HtmlDialog.js";
import {find} from "./dom/find.js";
import {CustomDomEvent} from "./customDomEvent.js";

export class RecordDialog extends HtmlDialog {

  private questionInput: HTMLInputElement;
  private answerInput: HTMLElement;
  private events: CustomDomEvent;

  constructor(container: HTMLDialogElement) {
    super(container);

    this.questionInput = find<HTMLInputElement>(container, '.recordDialogQuestion');
    this.answerInput = find<HTMLElement>(container, '.recordDialogAnswer');

    this.events = new CustomDomEvent(container);
    this.initEvents();
  }

  initEvents() {
    let cancelButton = find<HTMLButtonElement>(this.getDialogContainer(), '.recordDialogCancel');
    cancelButton.addEventListener("click", evt => {
      this.close();
    });

    let saveButton = find<HTMLButtonElement>(this.getDialogContainer(), '.recordDialogSave');
    saveButton.addEventListener("click", evt => {
      this.events.trigger(new CustomEvent("save", {
        detail: {
          question: this.questionInput.value,
          answer: this.answerInput.innerText
        }
      }));
    });
  }

  onSave(handler: (question: string, answer: string) => void) {
    this.events.listen("save", evt => {
      let question = <string>(<CustomEvent>evt).detail.question;
      let answer = <string>(<CustomEvent>evt).detail.answer;
      handler(question, answer);
    });
  }

}