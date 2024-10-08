import { GoogleGenerativeAI, GenerateContentResult } from "@google/generative-ai";

// Initialize GoogleGenerativeAI with your API_KEY.
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

const model = genAI.getGenerativeModel({
  // Choose a Gemini model.
  model: "gemini-1.5-flash",
});

// Upload file ...

export async function result(responseMimeType: string, responseUri: string): Promise<string> {
  try {
    // Generate content using text and the URI reference for the uploaded file.
    const result = await model.generateContent([
        {
          fileData: {
            mimeType: responseMimeType,
            fileUri: responseUri
          }
        },
        { text: "This is an image from a water meter. Please return only the numbers in the image, without any dots or letters, spaces, or other characters. Important only readings and measurements should be retuned" },
      ]);
      
      // console.log(result.response.text());
      return result.response.text()
    // Output the generated text to the console
  } catch (error) {
    console.log('this is an erro:', error)
    return {} as string; // Return a default value or an empty object
  }
}