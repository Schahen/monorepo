

export function insertFragment(element: Element, fragment: string, range?: Range) {
  if (!range) {
    range = window.getSelection().getRangeAt(0);
  }

  range.deleteContents();
  range.insertNode(document.createTextNode(fragment));
  range.collapse(false);

  element.normalize();
}