import {DataRecord} from "./data_loader.js";
import {Editor} from "./editor.js";

export class Test {
  data: DataRecord[] = [];
  questionElement: Element;
  answerElement: Element;
  answerEditor: Editor;
  private currentQuestion: DataRecord;

  constructor(data: DataRecord[]) {
    this.data = data;
    this.questionElement = <Element><any>document.getElementById("question");
    this.answerElement = <HTMLDivElement><any>document.getElementById("answer");

    this.answerEditor = new Editor(<HTMLDivElement><any>document.getElementById("answer"));
    this.initEvents();
  }

  private initEvents() {
    this.answerElement.addEventListener("keydown", (event) => {
      const evt = <KeyboardEvent> event;
      if (evt.metaKey) {
        if (evt.altKey) {
          let isUppercase = evt.shiftKey || evt.getModifierState("CapsLock");
          if (evt.code == "KeyS") {
            evt.preventDefault();
            this.answerEditor.insertFragment(isUppercase ? 'Sch' : 'sch');
          } else if (evt.code == "KeyT") {
            evt.preventDefault();
            this.answerEditor.insertFragment(isUppercase ? 'Tsch' : 'tsch');
          } else if (evt.code == "KeyO") {
            evt.preventDefault();
            this.answerEditor.insertFragment(isUppercase ? 'Ö' : 'ö');
          } else if (evt.code == "KeyU") {
            evt.preventDefault();
            this.answerEditor.insertFragment(isUppercase ? 'Ü' : 'ü');
          } else if (evt.code == "KeyA") {
            evt.preventDefault();
            this.answerEditor.insertFragment(isUppercase ? 'Ä' : 'ä');
          } else if (evt.code == "KeyC") {
            evt.preventDefault();
            this.answerEditor.insertFragment(isUppercase ? 'Ch' : 'ch');
          } else if (evt.code == "KeyX") {
            evt.preventDefault();
            this.answerEditor.insertFragment(isUppercase ? 'Ch' : 'ch');
          } else if (evt.code == "KeyE") {
            evt.preventDefault();
            this.answerEditor.insertFragment(isUppercase ? 'Ei' : 'ei');
          } else if (evt.code == "KeyJ") {
            evt.preventDefault();
            this.answerEditor.insertFragment(isUppercase ? 'Äu' : 'äu');
          }
        }
        if (evt.code == "Period") {
          this.ask();
        } else if (evt.code === "Slash") {
          this.hint();
        } else if (evt.key === "Enter") {
          this.check(this.answerEditor.getValue());
        }
      }
    });
  }

  private nextQuestion(): DataRecord {
    return this.data[Math.floor(Math.random() * this.data.length)]
  }

  private check(answer: string) {
    if (this.currentQuestion) {
      if (answer !== this.currentQuestion.a) {
        this.questionElement.classList.add("is-incorrect");
      } else {
        this.questionElement.classList.add("is-correct");
        this.ask();
      }
    }
  }

  private hint() {
    if (this.currentQuestion) {
      this.answerEditor.replace(this.currentQuestion.a);
    }
  }

  ask() {
    this.answerEditor.replace("");
    this.currentQuestion = this.nextQuestion();
    this.questionElement.textContent = this.currentQuestion.q;
  }
}