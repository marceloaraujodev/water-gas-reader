import isBase64 from 'is-base64';
// validate base64 str 
export const isValidBase64Image = (str: string): boolean => {
  return isBase64(str);
};

// 