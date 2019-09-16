function shuffle(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    // eslint-disable-next-line no-param-reassign
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

function getRandomArrayElements(arr, count) {
  const shuffled = arr.slice();
  let { length } = arr;
  const min = length - count;
  let temp;
  let uniqIndex;

  while (length > min) {
    length -= 1;
    uniqIndex = Math.floor((length + 1) * Math.random());
    temp = shuffled[uniqIndex];
    shuffled[uniqIndex] = shuffled[length];
    shuffled[length] = temp;
  }

  return shuffled.slice(min);
}

export { shuffle, getRandomArrayElements };
