let counter = 0;

export default function guidGenerator(fn) {
  counter++;
  const randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  const uniqid = randLetter + Date.now() + counter;
  setImmediate(() => fn(uniqid));
  return uniqid;
}
