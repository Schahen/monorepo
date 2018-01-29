import {DataRecord} from "./data_loader.js";

export class Test {
    data: DataRecord[] = [];
    questionElement: Element;
    answerElement: HTMLTextAreaElement;
    private currentQuestion: DataRecord;

    constructor(data: DataRecord[]) {
        this.data = data;
        this.questionElement = <Element><any>document.getElementById("question");
        this.answerElement = <HTMLTextAreaElement><any>document.getElementById("answer");

        this.initEvents();
    }

    private initEvents() {
        this.answerElement.addEventListener("keydown", evt => {
            if (evt.metaKey) {
                if (evt.altKey) {
                    let isUppercase = evt.shiftKey || evt.getModifierState("CapsLock");
                    if (evt.code == "KeyS") {
                        evt.preventDefault();
                        if (this.answerElement.value.endsWith("sch")) {
                            this.answerElement.value = this.answerElement.value.replace(/sch$/, 'ß');
                        } else {
                            this.answerElement.value += isUppercase ? 'Sch' : 'sch';
                        }
                    } else if (evt.code == "KeyT") {
                        evt.preventDefault();
                        this.answerElement.value += isUppercase ? 'Tsch' : 'tsch';
                    } else if (evt.code == "KeyO") {
                        evt.preventDefault();
                        this.answerElement.value += isUppercase ? 'Ö' : 'ö';
                    } else if (evt.code == "KeyU") {
                        evt.preventDefault();
                        this.answerElement.value += isUppercase ? 'Ü' : 'ü';
                    } else if (evt.code == "KeyA") {
                        evt.preventDefault();
                        this.answerElement.value += isUppercase ? 'Ä' : 'ä';
                    } else if (evt.code == "KeyX") {
                        evt.preventDefault();
                        this.answerElement.value += isUppercase ? 'Ch' : 'ch';
                    } else if (evt.code == "KeyE") {
                        evt.preventDefault();
                        this.answerElement.value += isUppercase ? 'Ei' : 'ei';
                    }
                }
                if (evt.code == "Period") {
                    this.ask();
                } else if (evt.code === "Slash") {
                    this.hint();
                } else if (evt.key === "Enter") {
                    this.check(this.answerElement.value);
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
            this.answerElement.value = this.currentQuestion.a;
        }
    }

    ask() {
        this.currentQuestion = this.nextQuestion();
        this.answerElement.value = "";
        this.questionElement.textContent = this.currentQuestion.q;
        this.answerElement.focus();
    }
}