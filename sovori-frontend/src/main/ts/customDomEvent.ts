
export class CustomDomEvent {

    constructor(private element: Element) {}

    listen(eventName: string, handler: EventListenerOrEventListenerObject) {
        this.element.addEventListener(eventName, handler);
    }

    trigger(event: CustomEvent): boolean {
        return this.element.dispatchEvent(event);
    }

}