import {LetterHandler} from "./LetterHandler.js";


export let germanLetterHandler = ((): LetterHandler => (code: string, isUppercase: boolean): string | null => {
  if (code == "KeyS") {
    return isUppercase ? 'Sch' : 'sch';
  } else if (code == "KeyT") {
    return isUppercase ? 'Tsch' : 'tsch';
  } else if (code == "KeyO") {
    return isUppercase ? 'Ö' : 'ö';
  } else if (code == "KeyU") {
    return isUppercase ? 'Ü' : 'ü';
  } else if (code == "KeyA") {
    return isUppercase ? 'Ä' : 'ä';
  } else if (code == "KeyC") {
    return isUppercase ? 'Ch' : 'ch';
  } else if (code == "KeyX") {
    return isUppercase ? 'Ch' : 'ch';
  } else if (code == "KeyE") {
    return isUppercase ? 'Ei' : 'ei'
  } else if (code == "KeyJ") {
    return isUppercase ? 'Äu' : 'äu';
  } else if (code == "KeyK") {
    return isUppercase ? 'Ck' : 'ck';
  } else if (code == "KeyN") {
    return isUppercase ? 'Ng' : 'ng';
  } else if (code == "KeyR") {
    return isUppercase ? 'Er' : 'er';
  }

  return null;
})();