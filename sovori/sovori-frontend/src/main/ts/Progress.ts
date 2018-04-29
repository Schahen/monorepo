import {find} from "./dom/find.js";


export class Progress {
  private countContainer: HTMLElement;
  private totalContainer: HTMLElement;
  private container: HTMLElement;

  private count: number = 0;
  private total: number = 0;

  constructor(container: HTMLElement) {
    this.container = container;

    this.countContainer = find(container, ".progressCount");
    this.totalContainer = find(container, ".progressTotal");

    this.setCount(0);
    this.setCount(0);
  }

  private setCount(count: number) {
    this.countContainer.innerText = String(count);
    this.count = count;
  }

  private setTotal(total: number) {
    this.totalContainer.innerText = String(total);
    this.total = total;
  }

  updateCount() {
    this.setCount(this.count + 1);
    this.updateTotal();
  }

  updateTotal() {
    this.setTotal(this.total + 1);
  }

}