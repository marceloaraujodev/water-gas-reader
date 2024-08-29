import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export function saveBase64ImageToTemp(base64Image: string): string{
  const tempDir = path.resolve(__dirname, '../temp');
  if(!fs.existsSync(tempDir)){
    fs.mkdirSync(tempDir);
  }

  const fileName = `${uuidv4()}.png`;
  const filePath = path.join(tempDir, fileName);

  // const base64Data = base64Image.replace(/^data:image\/png;base64,/, "");
  // console.log('base64data ----',base64Data)
  const base64Data = base64Image;

  // write base64 img to data file
  fs.writeFileSync(filePath, base64Data, 'base64');
  console.log('filepath-----------------',filePath)

  return filePath;

}

