/**
 * @name splitBy
 * * advanced string split
 */
export const splitBy = (str: string, separator: string) => {
  str = str.replace(/\s/g, ''); // remove whitespace

  const hasSeparator = str.indexOf(separator) > -1;

  return hasSeparator ? str.split(separator) : [ str, '' ];
};

export const splitByColon = (str: string) => {
  return splitBy(str, ':');
};

export const splitByComma = (str: string) => {
  return splitBy(str, ',');
};
