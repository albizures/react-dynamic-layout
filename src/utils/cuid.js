let counter = 0;

export default function guidGenerator(cb) {
  counter++;
  const randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  const uniqid = randLetter + Date.now() + counter;
  if (cb) setTimeout(() => cb(uniqid), 0);
  return uniqid;
}
