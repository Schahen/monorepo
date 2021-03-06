import {LetterHandler} from "./LetterHandler.js";
import {KeyDownEvent} from "../events/KeyDownEvent.js";


export let germanLetterHandler = ((): LetterHandler => (data: KeyDownEvent): string | null => {
  const {code, leftMetaKey, rightMetaKey} = data;
  const isUpperCase = data.capsLock || data.shiftKey;
  if (code == "KeyS") {
    return isUpperCase ? 'Sch' : 'sch';
  } else if (code == "KeyT") {
    return isUpperCase ? 'St' : 'st';
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
    if (rightMetaKey) {
      return isUpperCase ? 'Eu' : 'eu';
    }
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
    if (rightMetaKey) {
      return isUpperCase ? 'Me' : 'me';
    }
    return isUpperCase ? 'Em' : 'em';
  } else if (code == "KeyL") {
    if (rightMetaKey) {
      return isUpperCase ? 'Le' : 'le';
    }
    return isUpperCase ? 'el' : 'el';
  } else if (code == "KeyN") {
    if (rightMetaKey) {
      return isUpperCase ? 'Ne' : 'ne';
    }
    return isUpperCase ? 'En' : 'en';
  } else if (code == "KeyB") {
    return isUpperCase ? 'Be' : 'be';
  } else if (code == "KeyV") {
    return isUpperCase ? 'Vo' : 'vo';
  } else if (code == "KeyW") {
    return isUpperCase ? 'Wo' : 'wo';
  } else if (code == "KeyI") {
    if (rightMetaKey) {
      return isUpperCase ? 'In' : 'in';
    }
    return isUpperCase ? 'Ie' : 'ie';
  }

  return null;
})();