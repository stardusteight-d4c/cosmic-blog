export function detectClickOutsideElement(
  event: MouseEvent,
  elementID: string
) {
  const element: HTMLElement = document.getElementById(elementID)!;
  if (element) {
    const clickedOutside =
      !element.contains(event.target as Node) &&
      !element.isSameNode(event.target as Node);
    return { clickedOutside, elementCliked: event.target };
  }
  return { clickedOutside: undefined, elementCliked: undefined };

}
