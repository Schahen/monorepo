

export function insertFragment(element: Element, fragment: string|undefined, range?: Range) {
  if (fragment === undefined) {
    return;
  }

  if (!range) {
    range = window.getSelection().getRangeAt(0);
  }

  range.deleteContents();
  range.insertNode(document.createTextNode(fragment));
  range.collapse(false);

  element.normalize();
}