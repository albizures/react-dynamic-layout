
export function push(arr, item) {
  return arr.concat(item);
}

export function updateArrayItem(arr, index, item) {
  return [].concat(arr.slice(0, index), item, arr.slice(index + 1));
}

export function removeArrayItem(arr, index) {
  return [].concat(arr.slice(0, index), arr.slice(index + 1));
}
