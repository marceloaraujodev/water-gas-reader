import { GoogleGenerativeAI, GenerateContentResult } from "@google/generative-ai";


// Initialize GoogleGenerativeAI with your API_KEY.
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_STUDIO_API_KEY as string);

const model = genAI.getGenerativeModel({
  // Choose a Gemini model.
  model: "gemini-1.5-pro",
});

// Upload file ...

export async function result(responseMimeType: string, responseUri: string): Promise<GenerateContentResult> {
  try {
    // Generate content using text and the URI reference for the uploaded file.
    const result = await model.generateContent([
        {
          fileData: {
            mimeType: responseMimeType,
            fileUri: responseUri
          }
        },
        { text: "This is a image from a water meter, please read me the numbers" },
      ]);
      
      console.log(result.response.text())
      return result
    // Output the generated text to the console
  } catch (error) {
    console.log(error)
    return {} as GenerateContentResult; // Return a default value or an empty object
  }
}