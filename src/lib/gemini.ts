import { env } from "../env";

export async function processingImageToMeasurement(image: string) {
  const { GoogleGenerativeAI } = require("@google/generative-ai");
  const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Retorne apenas os dígitos registrados no medidor, Entre os digitos existe uma linha pequena e vertical preta para separar os digitos reais, Concentre-se em reconhecer dígitos completos e bem definidos`

  const { response } = await model.generateContent([
    prompt,
    {
      inlineData: {
        data: image,
        mimeType: "image/",
      },
    },
  ]);

  const generatedMeasurement = (response.text()).split('|').join('')

  return parseInt(generatedMeasurement, 10)
}