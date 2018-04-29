import {find} from "./dom/find.js";
import {RecordDialog} from "./RecordDialog.js";
import {CustomDomEvent} from "./customDomEvent.js";


export class Footer {
  private addButton: HTMLElement;
  private recordDialog: RecordDialog;
  private events: CustomDomEvent;

  constructor(footerContainer: Element) {
    this.addButton = find<HTMLElement>(footerContainer, '.footer-add-record');
    this.recordDialog = new RecordDialog(find<HTMLDialogElement>(document.body, "#recordDialog"));

    this.events = new CustomDomEvent(footerContainer);
    this.initEvents();
  }

  initEvents() {
    this.addButton.addEventListener("click", evt => {
      this.recordDialog.open();
    });

    this.recordDialog.onSave((question: string, answer: string) => {
      this.events.trigger(new CustomEvent("addrecord", {
        detail: {
          question: question,
          answer: answer
        }
      }));
    });
  }

  onAddRecord(handler: (question: string, answer: string) => void) {
    this.events.listen("addrecord", evt => {
      let question = <string>(<CustomEvent>evt).detail.question;
      let answer = <string>(<CustomEvent>evt).detail.answer;
      handler(question, answer);
    });
  }
}