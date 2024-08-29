import { GoogleAIFileManager, UploadFileResponse } from "@google/generative-ai/server";
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

// Initialize GoogleAIFileManager with your API_KEY.
const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY as string);

// Upload the file and specify a display name.
export async function uploadFile(filePath:string): Promise<UploadFileResponse> {
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


