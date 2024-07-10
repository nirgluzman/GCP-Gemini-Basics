import { GoogleGenerativeAI } from '@google/generative-ai';

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// The Gemini 1.5 models are versatile and work with most use cases
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Generate text from text-only input, https://ai.google.dev/gemini-api/docs/get-started/tutorial?lang=node
async function generateText(prompt) {
  const result = await model.generateContent(prompt);
  const response = result.response;
  return response.text();
}
