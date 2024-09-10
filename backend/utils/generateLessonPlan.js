const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI('AIzaSyCisoUVsPu31hUEkXFPJ1LMEyPIvCqIqKM');

async function generateLessonPlan(topic, gradeLevel, language) {
  try {
    const prompt = `Create a detailed lesson plan for ${topic} targeting ${gradeLevel}. Include objectives, materials, procedure, and assessment in ${language}.`;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash', language });
    const result = await model.generateContent(prompt);

    const response = await result.response;
    const generatedContent = response.text();

    if (!generatedContent) {
      throw new Error('Empty response received from Gemini.');
    }

    console.log('Generated Content:', generatedContent); 
    return generatedContent; 
  } catch (error) {
    console.error('Error generating lesson plan:', error);
    throw error;
  }
}

module.exports = { generateLessonPlan };
