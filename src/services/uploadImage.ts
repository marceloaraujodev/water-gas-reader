import { GoogleAIFileManager, UploadFileResponse } from "@google/generative-ai/server";
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

// Initialize GoogleAIFileManager with your API_KEY.
const fileManager = new GoogleAIFileManager(process.env.GOOGLE_AI_STUDIO_API_KEY as string);


// will need to create the file path and the for the working image
const filePath = path.resolve('src', '../src/public/meter.png');
console.log(filePath)
 
// Upload the file and specify a display name.
export async function uploadFile(image:string): Promise<UploadFileResponse> {
  try {
    const uploadResponse = await fileManager.uploadFile(filePath, {
      mimeType: "image/jpeg",
      displayName: "meter",
    });

    // Log the upload response for debugging.
    console.log(`Uploaded file ${uploadResponse.file.displayName} as: ${uploadResponse.file.uri}`);
    
    return uploadResponse;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}


