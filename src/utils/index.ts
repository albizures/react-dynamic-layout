type Dobounced = () => void;
type Debounce = (callback: Function, delay: number) => Dobounced;

const debounce: Debounce = (callback, delay) => {
  let timeout: number | undefined;
  return () => {
    clearTimeout(timeout);

    timeout = window.setTimeout(() => {
      timeout = undefined;
      callback();
    }, delay);
  };
};

/**
 *
 * @param {array} arr
 * @param {any} item
 */
function removeArrayItem<T>(arr: T[], item: T): T[] {
  const index = arr.indexOf(item);
  return ([] as T[]).concat(arr.slice(0, index), arr.slice(index + 1));
}

export { removeArrayItem, debounce };
