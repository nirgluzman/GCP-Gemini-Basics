import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Generate text from text-only input
// https://ai.google.dev/gemini-api/docs/get-started/tutorial?lang=node
async function generateTextContentFromPrompt(prompt) {
  // The Gemini 1.5 models are versatile and work with most use cases
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const result = await model.generateContent(prompt);
  const response = result.response;
  return response.text();
}

// Generate text from text-and-image input (multimodal)
// https://ai.google.dev/gemini-api/docs/get-started/tutorial?lang=node#generate-text-from-text-and-image-input

// Converts local file information to a GoogleGenerativeAI.Part object.
function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString('base64'),
      mimeType
    }
  };
}

async function generateTextDescriptionFromImageAndPrompt(prompt, ...images) {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const imageParts = images.map(image => fileToGenerativePart(image, 'image/jpeg'));

  const result = await model.generateContent([prompt, ...imageParts]);
  const response = result.response;
  return response.text();
}
