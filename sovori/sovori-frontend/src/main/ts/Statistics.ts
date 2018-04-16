

export class Statistics {
  right: number = 0;
  wrong: number = 0;

  registerRight() {
    this.right++;
  }

  registerWrong() {
    this.wrong++;
  }

  get total():number {
    return this.wrong + this.right;
  }
}