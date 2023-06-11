export function detectClickOutsideElement(
  event: MouseEvent,
  elementID: string
) {
  const element: HTMLElement = document.getElementById(elementID)!;
  const clickedOutside =
    !element.contains(event.target as Node) &&
    !element.isSameNode(event.target as Node);
  return { clickedOutside, elementCliked: event.target };
}
