export const capitelizeFirstLetter = (word = '') => {
  if (!word) return '';
  return word[0].toUpperCase() + word.substring(1);
};
