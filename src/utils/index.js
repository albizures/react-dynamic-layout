// @ts-check
/**
 * @param {{ (): void; (): void; }} callback
 * @param {number} delay
 */
export const debounce = (callback, delay) => {
  let timeout = null;
  return () => {
    clearInterval(timeout);

    timeout = setTimeout(() => {
      timeout = null;
      callback();
    }, delay);
  };
};

/**
 *
 * @param {array} arr
 * @param {any} item
 */
export function removeArrayItem(arr, item) {
  const index = arr.indexOf(item);
  return [].concat(arr.slice(0, index), arr.slice(index + 1));
}
