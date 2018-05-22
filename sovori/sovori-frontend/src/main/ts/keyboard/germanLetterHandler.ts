import {LetterHandler} from "./LetterHandler.js";
import {KeyDownEvent} from "../events/KeyDownEvent.js";


export let germanLetterHandler = ((): LetterHandler => (data: KeyDownEvent): string | null => {
  const {code, leftMetaKey, rightMetaKey} = data;
  const isUpperCase = data.capsLock || data.shiftKey;
  if (code == "KeyS") {
    return isUpperCase ? 'Sch' : 'sch';
  } else if (code == "KeyT") {
    return isUpperCase ? 'st' : 'st';
  } else if (code == "KeyO") {
    return isUpperCase ? 'Ö' : 'ö';
  } else if (code == "KeyU") {
    if (rightMetaKey) {
      return isUpperCase ? 'Au' : 'au';
    }
    return isUpperCase ? 'Ü' : 'ü';
  } else if (code == "KeyA") {
    return isUpperCase ? 'Ä' : 'ä';
  } else if (code == "KeyC") {
    return isUpperCase ? 'Ch' : 'ch';
  } else if (code == "KeyX") {
    return isUpperCase ? 'Ch' : 'ch';
  } else if (code == "KeyE") {
    return isUpperCase ? 'Ei' : 'ei'
  } else if (code == "KeyJ") {
    return isUpperCase ? 'Äu' : 'äu';
  } else if (code == "KeyK") {
    return isUpperCase ? 'Ck' : 'ck';
  } else if (code == "KeyG") {
    return isUpperCase ? 'ng' : 'ng';
  } else if (code == "KeyR") {
    return isUpperCase ? 'Er' : 'er';
  } else if (code == "KeyH") {
    return isUpperCase ? 'Eh' : 'eh';
  } else if (code == "KeyM") {
    return isUpperCase ? 'Em' : 'em';
  } else if (code == "KeyN") {
    return isUpperCase ? 'En' : 'en';
  } else if (code == "KeyB") {
    return isUpperCase ? 'Be' : 'be';
  } else if (code == "KeyV") {
    return isUpperCase ? 'Vo' : 'vo';
  } else if (code == "KeyI") {
    return isUpperCase ? 'Ie' : 'ie';
  }

  return null;
})();