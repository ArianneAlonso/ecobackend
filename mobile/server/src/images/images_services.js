import fs from 'fs';
import { GoogleGenerativeAI } from '@google/generative-ai';
import prompt_system from './config/template.js'; // Ajústalo según la ubicación
import client from './config/config.js'; // Aquí es donde configuras tu cliente Gemini

// Función asincrónica que recibe el path de la imagen y el mime type
export async function processImage(imagePath, mimeType) {
  if (!imagePath) {
    throw new Error('imagePath no fue proporcionado');
  }
  if (!['image/png', 'image/jpeg'].includes(mimeType)) {
    throw new Error('Tipo de archivo no soportado por el modelo');
  }

  try {
    // Lee la imagen en binario
    const imageBytes = fs.readFileSync(imagePath);

    // Prepara los contenidos para la API (según el modelo Gemini)
    const model = client.getGenerativeModel({ model: "gemini-2.5-flash" });

    const systemContent = {
      role: "system",
      parts: [{ text: prompt_system }]
    };

    const userContent = {
      role: "user",
      parts: [
        {
          inlineData: {
            data: imageBytes.toString('base64'), // Gemini espera base64 para imágenes
            mimeType: mimeType
          }
        }
      ]
    };

    // Llama al modelo
    const result = await model.generateContent([systemContent, userContent]);

    if (result && result.response && result.response.text) {
      console.log("--- RESPUESTA DE GEMINI (Cruda) ---\n" + result.response.text + "\n---------------------------------");
      return result.response.text;
    } else {
      throw new Error("La IA no generó una respuesta de texto.");
    }

  } catch (e) {
    console.error("Error llamando a la API de Gemini: " + e);
    throw new Error("Error en la API de IA: " + e);
  } finally {
    // Borra la imagen después de procesar
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }
}
