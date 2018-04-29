export function find<E extends Element = Element>(node: ParentNode, selector: string): E {
  let el = document.querySelector<E>(selector);
  if (el == null) {
    throw `element not found by selector ${selector}`;
  }
  return el;
}

export function findById<E extends Element = Element>(
  id: string): E {
  return find<E>(document.body, `#${id}`);
}