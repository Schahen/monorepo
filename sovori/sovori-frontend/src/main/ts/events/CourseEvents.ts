import {StackedEvent} from "./StackedEvent.js";
import {Question} from "../Question.js";

export module CourseEvents {
  export let RIGHT_ANSWER = new StackedEvent<Question>();
  export let WRONG_ANSWER = new StackedEvent<Question>();
}