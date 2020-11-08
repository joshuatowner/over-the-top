import {Size} from "../../util/vec2";

export function elementSize(element: HTMLElement): Size {
  return {
    width: element.offsetWidth,
    height: element.offsetHeight,
  };
}