export const truncate = (str, maxLength) => {
  return str.length > maxLength || 10
    ? str.substring(0, maxLength) + '...'
    : str;
};
