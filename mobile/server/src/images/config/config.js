import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();
const apiKey = process.env.GENAI_API_KEY;

const client = new GoogleGenerativeAI(apiKey);
export default client;