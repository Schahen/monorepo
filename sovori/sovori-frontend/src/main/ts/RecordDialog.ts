import {HtmlDialog} from "./dialog/HtmlDialog.js";
import {find} from "./dom/find.js";

export class RecordDialog extends HtmlDialog {

  private questionInput: HTMLInputElement;
  private answerInput: HTMLElement;

  constructor(container: HTMLDialogElement) {
    super(container);

    this.questionInput = find<HTMLInputElement>(container, '.recordDialogQuestion');
    this.answerInput = find<HTMLElement>(container, '.recordDialogAnswer');
  }

}