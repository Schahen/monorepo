import {TestRecord} from "./data_loader.js";
import {Editor} from "./editor.js";
import {Statistics} from "./Statistics.js";
import {Question} from "./Question.js";

export class Test {
  data: TestRecord[] = [];
  questionElement: Element;
  answerEditor: Editor;
  stats: Statistics;
  private currentQuestion: Question;

  constructor(data: TestRecord[]) {
    this.data = data;
    this.questionElement = <Element><any>document.getElementById("question");

    this.stats = new Statistics();
    this.answerEditor = new Editor(<HTMLElement>document.getElementById("answer"));
    this.initEvents();
  }

  private showStats() {
    console.log(`total: ${this.stats.total}: ${this.stats.wrong}:${this.stats.right}`)
  }

  private initEvents() {
    this.answerEditor.eventsManager.listen("editorKeyDown", (event) => {
      let evt =  (<CustomEvent> event).detail;
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
      this.stats.registerRight();
      this.questionElement.classList.add("is-correct");
      this.showStats();
      this.ask();
    })

    this.answerEditor.eventsManager.listen("wrongAnswer", () => {
      this.stats.registerWrong();
      this.questionElement.classList.add("is-incorrect");
      this.showStats();
    })
  }

  private triggerEvent(eventName: 'rightAnswer' | 'wrongAnswer') {
    this.answerEditor.eventsManager.trigger(new CustomEvent(eventName));
  }

  private nextQuestion(): Question {
    let testRecord = this.data[Math.floor(Math.random() * this.data.length)];
    return new Question(testRecord);
  }

  private check(givenAnswer: string) {
    if (this.currentQuestion) {
      if (!this.currentQuestion.check(givenAnswer)) {
        this.triggerEvent("wrongAnswer");
      } else {
        this.triggerEvent("rightAnswer");
      }
    }
  }

  private hint() {
    if (this.currentQuestion) {
      this.answerEditor.replace(this.currentQuestion.answer);
    }
  }

  ask() {
    this.answerEditor.replace("");
    this.currentQuestion = this.nextQuestion();
    this.questionElement.textContent = this.currentQuestion.question;
  }
}