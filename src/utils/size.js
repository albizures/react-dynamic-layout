function isFloat(n) {
  return Number(n) === n && n % 1 !== 0;
}

export function parseSize(size, maxSize) {
  // NOTE: a interger is interpreted as a percentage
  // 100 == '100%'
  let newSize;
  if (Number.isInteger(size) || isFloat(size)) {
    newSize = {
      px: (maxSize * size) / 100,
      percent: size,
      isVariable: true,
    };
  } else if (size.indexOf('calc') !== -1) {
    const match = size.match(/[0-9]+(px|%)/g);
    size = parseInt(match[0], 10) - parseSize(match[1], maxSize).percent;
    newSize = parseSize(size, maxSize);
  } else if (size.indexOf('px') !== -1) {
    size = parseInt(size, 10);
    newSize = {
      percent: (size * 100) / maxSize,
      px: size,
    };
  } else if (size.indexOf('%') !== -1) {
    newSize = parseSize(parseInt(size, 10), maxSize);
  }
  if (!newSize || Number.isNaN(newSize.percent) || Number.isNaN(newSize.px)) {
    throw new Error('Incorrect size: ' + size);
  }
  return newSize;
}

export const getDiff = (actualSize, newSize) => ({
  width: newSize.width - actualSize.width,
  height: newSize.height - actualSize.height,
});

// export const getDiff = (actualSize, newSize) => ({
//   width: actualSize.width - newSize.width,
//   height: actualSize.height - newSize.height
// });

export const getPercent = (partSize, totalSize) => ({
  width: (partSize.width * 100) / totalSize.width / 100,
  height: (partSize.height * 100) / totalSize.height / 100,
});
