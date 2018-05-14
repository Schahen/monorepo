import {HtmlDialog} from "./dialog/HtmlDialog.js";
import {find} from "./dom/find.js";
import {InputEvent} from "./events/InputEvent.js";
import {germanLetterHandler} from "./keyboard/germanLetterHandler.js";
import {insertFragment} from "./dom/insertFragment.js";
import {RegisteredEvent} from "./events/RegisteredEvent.js";
import {StackedEvent} from "./events/StackedEvent.js";
import {registerClick, withClick} from "./events/addRegisteredEvent.js";

export type AddRecordData = {
  question: string,
  answer: string
}

export class AddRecordDialog extends HtmlDialog {

  private questionInput: HTMLInputElement;
  private answerInput: HTMLElement;

  private submitEvent: RegisteredEvent<AddRecordData> = new StackedEvent();

  constructor(container: HTMLDialogElement) {
    super(container);

    this.questionInput = find<HTMLInputElement>(container, '.recordDialogQuestion');
    this.answerInput = find<HTMLElement>(container, '.recordDialogAnswer');

    this.initEvents();
  }

  initEvents() {
    let cancelButton = find<HTMLButtonElement>(this.getDialogContainer(), '.recordDialogCancel');
    withClick(cancelButton).on(() => {
      this.close();
    });

    let saveButton = find<HTMLButtonElement>(this.getDialogContainer(), '.recordDialogSave');

    registerClick(saveButton, evt => ({
      question: this.questionInput.value,
      answer: this.answerInput.innerText
    })).delegate(this.submitEvent);

    this.openEvent.on(() => {
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