const keys = new WeakMap();
let counter = 0;

const getIdBy = (reference: object): string => {
  if (keys.has(reference)) {
    return keys.get(reference);
  }

  const id = counter.toString();
  counter += 1;
  keys.set(reference, id);

  return id.toString();
};

const createId = (): string => {
  const id = counter;

  counter += 1;

  return id.toString();
};

export { getIdBy, createId };
