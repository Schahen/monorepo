import {KeyDownEvent} from "../events/KeyDownEvent.js";


export interface LetterHandler {
  (data: KeyDownEvent) : string | null;
}