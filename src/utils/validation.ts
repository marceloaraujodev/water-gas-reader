import isBase64 from 'is-base64';
// validate base64 str 
export const isValidBase64Image = (str: string): boolean => {
  return isBase64(str);
};

export const isValidString = (value: any): boolean => {
  return typeof value === 'string' && value !== null && value !== undefined && value.length > 0;
}

export const isValidDate = (value: any): boolean => {
  const date = new Date(value);
  return !isNaN(date.getTime());
}

export const isValidMeasureType = (value: any): boolean => {
  const validTypes = ['WATER', 'GAS'];
  return isValidString(value) && validTypes.includes(value);
}
