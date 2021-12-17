export const truncate = (str, maxLength = 10) => {
  return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
};
