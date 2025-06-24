import questions from '/assets/code/questions';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: 'This endpoint only accepts GET requests'
    });
  }

  try {
    console.log('Questions:', questions);
    if (!Array.isArray(questions)) {
      throw new Error('Questions is not an array');
    }
    const randomIndex = Math.floor(Math.random() * questions.length);
    const randomQuestion = questions[randomIndex];

    res.status(200).json({
      question: randomQuestion,
      id: randomIndex + 1,
      total_questions: questions.length,
      info: {
        credits: "Made by harys722, only available for cool people!",
        website: "https://harys.is-a.dev/"
      }
    });
  } catch (error) {
    console.error('Error generating question:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message || 'Failed to generate random question'
    });
  }
}
