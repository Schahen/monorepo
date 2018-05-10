import {find} from "./dom/find.js";
import {HtmlDialog} from "./dialog/HtmlDialog.js";
import {CustomDomEvent} from "./customDomEvent.js";
import {DialogEvents} from "./dialog/DialogEvents.js";

export class QuestionDialog extends HtmlDialog {

  private questionInput: HTMLInputElement;
  private closeButton: HTMLButtonElement;
  private saveButton: HTMLButtonElement;

  private events: CustomDomEvent;

  constructor(container: HTMLDialogElement) {
    super(container);

    this.questionInput = find<HTMLInputElement>(this.getDialogContainer(), '.question-dialog-input');
    this.closeButton = find<HTMLButtonElement>(this.getDialogContainer(), '.question-dialog-close');
    this.saveButton = find<HTMLButtonElement>(this.getDialogContainer(), '.question-dialog-save');

    this.events = new CustomDomEvent(container);
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

    this.on(DialogEvents.ONOPEN, () => {
      this.questionInput.focus();
    });
  }

  save() {
    this.events.trigger(new CustomEvent("save", {
      detail: {
        question: this.questionInput.value
      }
    }));
  }

  onSave(handler: (question: string) => void) {
    this.events.listen("save", evt => {
      let question = <string>(<CustomEvent>evt).detail.question;
      handler(question);
    });
  }

  setQuestion(question: string) {
    this.questionInput.value = question;
  }

}