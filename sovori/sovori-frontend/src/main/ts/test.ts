import {Editor} from "./editor.js";
import {Statistics} from "./Statistics.js";
import {Question} from "./Question.js";
import {EditRecordDialog} from "./EditRecordDialog.js";
import {CourseHttp} from "./api/CourseHttp.js";
import {TestRecord} from "crossplatform/TestRecord.js";
import {Footer} from "./Footer.js";
import {findById} from "./dom/find.js";
import {Progress} from "./Progress.js";
import {CourseEvents} from "./events/CourseEvents.js";
import {QuestionRecord} from "./QuestionRecord.js";

export class Test {
  data: QuestionRecord[] = [];
  questionElement: HTMLElement;
  answerEditor: Editor;
  stats: Statistics;
  private currentQuestion?: Question;
  private footer: Footer;
  courseId: string;
  private questionDialog: EditRecordDialog;
  private progress: Progress;

  constructor(courseId: string, data: TestRecord[]) {
    this.data = data.map(question => ({question, answeredWrong: 0}))
    this.courseId = courseId;
    this.questionElement = findById<HTMLElement>("question");
    this.stats = new Statistics();
    this.answerEditor = new Editor(findById<HTMLElement>("answer"));

    this.footer = new Footer(findById<HTMLElement>('footer'));
    this.questionDialog = new EditRecordDialog(findById<HTMLDialogElement>('questionDialog'));

    this.progress = new Progress(findById<HTMLElement>('progress'));

    this.initEvents();
  }

  private showStats() {
    console.log(`total: ${this.stats.total}: ${this.stats.wrong}:${this.stats.right}`)
  }

  private initEvents() {

    this.answerEditor.getKeyDownRegistration().on(evt => {
      if (evt.metaKey) {
        if (evt.code == "Period") {
          this.progress.updateTotal();
          this.ask();
        } else if (evt.code === "Slash") {
          this.hint();
        } else if (evt.key === "Enter") {
          this.check(this.answerEditor.getValue());
        }
      }
    });


    CourseEvents.RIGHT_ANSWER.on(() => {
      this.stats.registerRight();
      this.questionElement.classList.add("is-correct");
      this.showStats();
      this.ask();

      this.progress.updateCount();
    });

    CourseEvents.WRONG_ANSWER.on(() => {
      this.stats.registerWrong();
      this.questionElement.classList.add("is-incorrect");
      this.showStats();

      this.progress.updateTotal();
    });

    this.questionDialog.onSave(record => {
      let question = record.question;
      if (this.currentQuestion != null) {
        new CourseHttp(this.courseId).updateQuestion(this.currentQuestion.id, question);
        this.questionDialog.close();
      }
    });

    this.questionElement.addEventListener("dblclick", evt => {
      this.questionDialog.open();
      this.questionDialog.setQuestion(this.questionElement.dataset.question || "");
    });

    this.footer.getAddRecordEvent().on(record => {
      let {question, answer} = record;

      new CourseHttp(this.courseId).add({
        q: question,
        a: answer
      });
    });
  }


  private nextQuestion(): Question {
    let testRecord = this.data[Math.floor(Math.random() * this.data.length)];
    return new Question(testRecord);
  }

  private check(givenAnswer: string) {
    if (this.currentQuestion) {
      if (!this.currentQuestion.check(givenAnswer)) {
        CourseEvents.WRONG_ANSWER.trigger(true);
      } else {
        CourseEvents.RIGHT_ANSWER.trigger(true);
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

    this.questionElement.dataset.id = this.currentQuestion.id;
    this.questionElement.dataset.question = this.currentQuestion.question;
    this.questionElement.textContent = this.currentQuestion.question;
  }
}