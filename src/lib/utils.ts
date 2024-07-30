import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

type Data = {
  [key: string]: string | boolean | number;
};

type Values = {
  [key: string]: string;
};

/**
 * Combines multiple class names into a single string.
 * @param inputs - The class names to be combined.
 * @returns The combined class names as a string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ############### clear default behavior input numbers  ###############
export const handleKeyDown: any = (event: KeyboardEvent) => {
  if (event.key === "ArrowUp" || event.key === "ArrowDown") {
    event.preventDefault();
  }
}

export const handleWheel: any = (event: WheelEvent) => {
  (event.target as HTMLElement).blur();
};

/**
 * Handles the delay when scrolling with the mouse wheel.
 * @param e - The wheel event object.
 */
export function handleDelayWheel(e: any) {
  if (e.deltaY > 0) {
    e.currentTarget.scrollTop += 50;
  } else {
    e.currentTarget.scrollTop -= 50;
  }
}


export function CompareValues(values : Values, data : Data) {
  const NewValues = Object.keys(values)
    .filter((key) => {
      if (typeof data[key] === "boolean") {
        return values[key] !== String(data[key]);
      }
      return values[key] !== data[key];
    })
    .map((key) => {
      return { [key]: values[key] };
    });

  if (NewValues.length === 0) {
    return false;
  } else {
    const mergedObject = Object.assign({}, ...NewValues);
    return mergedObject;
  }
}