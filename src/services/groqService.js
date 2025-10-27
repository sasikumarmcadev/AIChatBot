import { Groq } from 'groq-sdk';

class GroqService {
  constructor() {
    // TEMPORARY: Replace with your actual API key
    const apiKey = ''; 
    
    if (!apiKey) {
      throw new Error('Groq API key is missing');
    }
    
    this.groq = new Groq({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true
    });
  }

  async getChatCompletion(messages, model = 'llama-3.1-8b-instant') {
    try {
      const chatCompletion = await this.groq.chat.completions.create({
        messages: messages,
        model: model, // Changed to a proper chat model
        temperature: 1,
        max_completion_tokens: 1024,
        top_p: 1,
        stream: false,
        stop: null
      });

      return chatCompletion.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('Error calling Groq API:', error);
      console.error('Error details:', error.message);
      throw error;
    }
  }
}

export default new GroqService();