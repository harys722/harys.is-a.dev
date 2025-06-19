// Import questions from separate file
import { questions } from './assets/code/data.js'

export default function handler(req, res) {
  // Set CORS headers for cross-origin requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: 'This endpoint only accepts GET requests'
    });
  }

  try {
    // Generate random index
    const randomIndex = Math.floor(Math.random() * questions.length);
    const randomQuestion = questions[randomIndex];

    // Return the question with some metadata
    res.status(200).json({
      question: randomQuestion,
      id: randomIndex + 1,
      total_questions: questions.length,
      generated_at: new Date().toISOString(),
      info: {
        credits: "Made by harys722, only available for cool people!",
        website: "https://harys.is-a.dev/"
      }
    });

  } catch (error) {
    console.error('Error generating question:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to generate random question'
    });
  }
}
