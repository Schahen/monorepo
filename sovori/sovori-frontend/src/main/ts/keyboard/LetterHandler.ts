

export interface LetterHandler {
  (code: string, shift: boolean) : string | null;
}