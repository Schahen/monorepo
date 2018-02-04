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
        if (evt.code == "Period") {
          this.ask();
        } else if (evt.code === "Slash") {
          this.hint();
        } else if (evt.key === "Enter") {
          this.check(this.answerEditor.getValue());
        }
      }
    });

    this.answerEditor.eventsManager.listen("rightAnswer", () => {
      this.questionElement.classList.add("is-correct");
      this.ask();
    })

    this.answerEditor.eventsManager.listen("wrongAnswer", () => {
      this.questionElement.classList.add("is-incorrect");
    })
  }

  private triggerEvent(eventName: 'rightAnswer' | 'wrongAnswer') {
    this.answerEditor.eventsManager.trigger(new CustomEvent(eventName));
  }

  private nextQuestion(): DataRecord {
    return this.data[Math.floor(Math.random() * this.data.length)]
  }

  private check(answer: string) {
    if (this.currentQuestion) {
      if (answer !== this.currentQuestion.a) {
        this.triggerEvent("wrongAnswer");
      } else {
        this.triggerEvent("rightAnswer");
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