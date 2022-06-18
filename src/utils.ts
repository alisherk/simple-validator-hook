export const capitalize = (text: string): string =>
  text.charAt(0).toUpperCase() + text.slice(1);

type Procedure = (...args: any[]) => void;

export function debounce<F extends Procedure>(
  func: F,
  waitMilliseconds = 50,
  isImmediate: boolean = false
): (...args: Parameters<F>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return function (...args: Parameters<F>) {
    const doLater = function () {
      timeoutId = undefined;
      if (!isImmediate) func(...args);
    };

    const shouldCallNow = isImmediate && timeoutId === undefined;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(doLater, waitMilliseconds);

    if (shouldCallNow) {
      func(...args);
    }
  };
}
