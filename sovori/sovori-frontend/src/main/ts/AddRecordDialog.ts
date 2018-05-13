import {HtmlDialog} from "./dialog/HtmlDialog.js";
import {find} from "./dom/find.js";
import {CustomDomEvent} from "./customDomEvent.js";
import {DialogEvents} from "./dialog/DialogEvents.js";
import {InputEvent} from "./events/InputEvent.js";
import {germanLetterHandler} from "./keyboard/germanLetterHandler.js";
import {insertFragment} from "./dom/insertFragment.js";
import {RegisteredEvent} from "./events/RegisteredEvent.js";
import {StackedEvent} from "./events/StackedEvent.js";
import {addRegisteredEvent} from "./events/addRegisteredEvent.js";

export type AddRecordData = {
  question: string,
  answer: string
}

export class AddRecordDialog   extends HtmlDialog {

  private questionInput: HTMLInputElement;
  private answerInput: HTMLElement;
  private events: CustomDomEvent;

  private submitEvent: RegisteredEvent<AddRecordData> = new StackedEvent();

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

    addRegisteredEvent(saveButton, "click", evt => ({
      question: this.questionInput.value,
      answer: this.answerInput.innerText
    })).delegate(this.submitEvent);

    this.on(DialogEvents.ONOPEN, () => {
      this.questionInput.focus();
    });

    this.submitEvent.on(() => {
      this.close();
    });

    InputEvent.resolveLetter(InputEvent.keyDown(this.answerInput), germanLetterHandler).on(fragment => {
      insertFragment(this.answerInput, fragment);
    });
  }

  getSubmitEvent() {
    return this.submitEvent;
  }

}