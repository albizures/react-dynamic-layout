/* eslint-disable import/prefer-default-export */
const keys = new WeakMap();
let counter = 0;

/**
 *
 * @param {object} reference
 * @returns {string}
 */
export const getIdBy = (reference) => {
  if (keys.has(reference)) {
    return keys.get(reference);
  }

  const id = counter.toString();
  counter += 1;
  keys.set(reference, id);

  return id.toString();
};

export const createId = () => {
  const id = counter;

  counter += 1;

  return id.toString();
};
