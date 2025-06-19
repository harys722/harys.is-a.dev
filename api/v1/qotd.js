// Huge collection of questions for QOTD system
const questions = [
  // Philosophical & Deep Thinking
  "What would you do if you knew you could not fail?",
  "If you could ask your future self one question, what would it be?",
  "What's the most important lesson you've learned from failure?",
  "If happiness was a currency, what would make you the richest person alive?",
  "What would you do differently if you knew nobody would judge you?",
  "What's the difference between being alive and truly living?",
  "If you could give your younger self one piece of advice, what would it be?",
  "What question do you wish people would ask you more often?",
  "What's something you believe that most people disagree with?",
  "If you had to teach someone one thing, what would you teach them?",
  
  // Personal Growth & Self-Reflection
  "What's a skill you wish you had but have never tried to develop?",
  "What's the best compliment you've ever received?",
  "What's something you're proud of but rarely talk about?",
  "What habit has had the biggest positive impact on your life?",
  "What's a fear you've overcome, and how did you do it?",
  "What's something that always makes you feel better when you're down?",
  "What's the most spontaneous thing you've ever done?",
  "What's a goal you're working towards right now?",
  "What's something you've changed your mind about recently?",
  "What's the most valuable thing you own that money can't buy?",
  
  // Creativity & Imagination
  "If you could create a new holiday, what would it celebrate?",
  "What would be the title of your autobiography?",
  "If you could have dinner with any three people, dead or alive, who would they be?",
  "What superpower would be the most inconvenient to have?",
  "If you could live in any fictional world, which would you choose?",
  "What would you do with an extra hour in every day?",
  "If you could master any instrument instantly, which would you choose?",
  "What's the most creative use for a paperclip you can think of?",
  "If you had to live without one of your five senses, which would you choose?",
  "What would you name your pet dragon?",
  
  // Relationships & Social
  "What's the kindest thing someone has done for you?",
  "What quality do you most admire in others?",
  "What's the best advice you've ever given someone?",
  "How do you show love to others?",
  "What's something you wish more people knew about you?",
  "What makes a good friend?",
  "What's the most memorable conversation you've ever had?",
  "How do you handle disagreements with people you care about?",
  "What's something you're grateful for that you often take for granted?",
  "What's the best way to cheer up a friend?",
  
  // Life Experiences & Memories
  "What's your favorite childhood memory?",
  "What's the most beautiful place you've ever been?",
  "What's something that never fails to make you laugh?",
  "What's the best meal you've ever had?",
  "What's a moment when you felt truly proud of yourself?",
  "What's the most interesting person you've ever met?",
  "What's something you collect or used to collect?",
  "What's the best piece of advice you've ever received?",
  "What's a tradition you hope to pass on to future generations?",
  "What's your favorite way to spend a rainy day?",
  
  // Dreams & Aspirations
  "What's on your bucket list?",
  "If money wasn't a factor, what would you do with your life?",
  "What's a skill you'd love to learn in the next year?",
  "Where would you love to travel next?",
  "What's something you want to be remembered for?",
  "If you could solve one world problem, what would it be?",
  "What's your dream job?",
  "What legacy do you want to leave behind?",
  "What's something you want to accomplish before you turn 80?",
  "If you could learn the answer to one mystery, what would it be?",
  
  // Fun & Lighthearted
  "What's your go-to karaoke song?",
  "If you were a flavor of ice cream, what would you be?",
  "What's the weirdest food combination you actually enjoy?",
  "What movie could you watch over and over without getting tired of it?",
  "What's your favorite smell?",
  "If you could be any animal for a day, what would you choose?",
  "What's the most unusual talent you have?",
  "What's your favorite word in any language?",
  "If you had a theme song, what would it be?",
  "What's the best joke you know by heart?",
  
  // Values & Beliefs
  "What do you think is the secret to happiness?",
  "What's more important: being kind or being honest?",
  "What gives your life meaning?",
  "What's something you believe everyone should experience at least once?",
  "What's the coolest thing about space?",
  "What's the most important thing you want to teach your children (or future children)?",
  "What do you think is humanity's greatest achievement?",
  "What's something you think society gets wrong?",
  "What principle do you never compromise on?",
  "What do you think is the purpose of life?",
  
  // Hypothetical Scenarios
  "If you could time travel, would you go to the past or the future?",
  "What would you do if you won the lottery tomorrow?",
  "If you could be invisible for one day, what would you do?",
  "Would you rather be able to fly or be invisible?",
  "If you could read minds for a day, would you want to?",
  "What would you do if you were alone on a deserted island?",
  "If you could live for 200 years, what would you want to learn?",
  "Would you rather know what surprise you're getting or when you're getting it?",
  "If you could have any job in the world, what would it be?",
  "What would you do if you could pause time for everyone but yourself?",
  
  // Technology & Future
  "What technology do you think will be obsolete in 20 years?",
  "If you could invent anything, what would it be?",
  "What's your relationship with social media?",
  "Do you think artificial intelligence is more helpful or harmful?",
  "What's the most useful app on your phone?",
  "How do you think the world will be different in 50 years?",
  "What's something modern that you think people in the past would find magical?",
  "If you could upgrade one thing about your body with technology, what would it be?",
  "What's the best invention of the last 100 years?",
  "Do you think we'll make contact with alien life in your lifetime?",
  
  // Nature & Environment
  "What's your favorite season and why?",
  "If you were a tree, what kind would you be?",
  "What's the most amazing thing about nature?",
  "Do you prefer mountains or oceans?",
  "What animal do you think you're most like?",
  "What's your favorite weather?",
  "If you could live anywhere in the world, where would it be?",
  "What's the most beautiful thing you've seen in nature?",
  "How do you feel most connected to the natural world?",
  "What's one thing everyone could do to help the environment?",
  
  // Work & Career
  "What's the best part of your job?",
  "If you could have any career for just one year, what would you choose?",
  "What's the most important quality in a leader?",
  "What motivates you to work hard?",
  "What's the best professional advice you've received?",
  "If you could change one thing about your work environment, what would it be?",
  "What's a skill that everyone should have regardless of their job?",
  "What does success mean to you?",
  "What's the worst job you can imagine having?",
  "If you could work with anyone, who would it be?",
  
  // Random & Quirky
  "What's the strangest compliment you've ever received?",
  "If you could rename yourself, what name would you choose?",
  "What's something that's always in your bag/pocket?",
  "What's your weirdest habit?",
  "If you were famous, what would you be famous for?",
  "What's the most useless talent you have?",
  "What's something that makes you feel nostalgic?",
  "If you could only eat one food for the rest of your life, what would it be?",
  "What's the strangest thing you believed as a child?",
  "What's your guilty pleasure?",
  
  // Learning & Knowledge
  "What's something new you learned recently?",
  "If you could instantly become an expert in any subject, what would you choose?",
  "What's the most interesting fact you know?",
  "What's something you wish they taught in school?",
  "Who has taught you the most about life?",
  "What book has had the biggest impact on you?",
  "What's a skill you think everyone should learn?",
  "If you could ask any historical figure one question, what would it be?",
  "What's something you're curious about but have never looked into?",
  "What's the best way you learn new things?",
  
  // Emotions & Mental Health
  "What helps you stay calm under pressure?",
  "How do you deal with disappointment?",
  "What makes you feel most confident?",
  "What's your favorite way to celebrate good news?",
  "How do you handle stress?",
  "What makes you feel grateful?",
  "What's something that always lifts your mood?",
  "How do you practice self-care?",
  "What's the best way to comfort yourself when you're sad?",
  "What emotion do you experience most often?",
  
  // Culture & Society
  "What's a tradition from your culture that you love?",
  "What's something you wish more people understood about your generation?",
  "What change would you like to see in the world?",
  "What's something that gives you hope for the future?",
  "What do you think is the biggest challenge facing society today?",
  "What's a cause you're passionate about?",
  "How do you think we can make the world a kinder place?",
  "What's something positive you've noticed about people recently?",
  "What's a stereotype about your country/culture that isn't true?",
  "What's something you think every person should experience?",
  
  // Time & Productivity
  "What's your most productive time of day?",
  "How do you like to spend your free time?",
  "What's something you wish you had more time for?",
  "What's the best use of 10 minutes?",
  "How has your relationship with time changed as you've gotten older?",
  "What's something you used to spend a lot of time on but don't anymore?",
  "What's your favorite way to waste time?",
  "If you had an extra day every week, what would you do with it?",
  "What's something you always make time for?",
  "How do you balance work and personal life?",
  
  // Adventure & Risk
  "What's the biggest risk you've ever taken?",
  "What's on your adventure bucket list?",
  "What's the most spontaneous thing you've ever done?",
  "What scares you but excites you at the same time?",
  "What's something you've always wanted to try but haven't yet?",
  "What's the most adventurous thing you've done this year?",
  "How do you step out of your comfort zone?",
  "What's a calculated risk that paid off for you?",
  "What adventure would you go on if money was no object?",
  "What's something brave you did as a child?",
  
  // Food & Cooking
  "What's your comfort food?",
  "If you could only cook one dish perfectly, what would it be?",
  "What's the most adventurous thing you've eaten?",
  "What smell from the kitchen makes you happiest?",
  "What's a food you hated as a child but love now?",
  "If you opened a restaurant, what type of food would you serve?",
  "What's your favorite meal to cook for others?",
  "What food reminds you most of home?",
  "What's the weirdest food combination that you actually enjoy?",
  "If you could have dinner with anyone, what would you cook?",
  
  // Music & Arts
  "What song always gets you moving?",
  "If your life had a soundtrack, what genre would it be?",
  "What's a song that brings back strong memories?",
  "If you could play any instrument masterfully, which would you choose?",
  "What's the last song that got stuck in your head?",
  "What art form do you most admire?",
  "If you could commission any artist to create something for you, what would it be?",
  "What's your favorite way to express creativity?",
  "What music do you listen to when you need motivation?",
  "If you could attend any concert in history, which would you choose?",
  
  // Communication & Language
  "What's your favorite word?",
  "What language would you love to learn?",
  "What's the most interesting conversation you've had recently?",
  "How do you prefer to communicate: in person, phone, or text?",
  "What's something you wish you were better at explaining?",
  "What's the best compliment you could give someone?",
  "What question do you love being asked?",
  "What's something you wish people would ask you about?",
  "How do you show someone you're really listening?",
  "What's the most meaningful text or message you've received?",
  
  // Home & Living
  "What makes a house feel like home to you?",
  "What's your favorite room in your house and why?",
  "If you could change one thing about where you live, what would it be?",
  "What's something in your home that brings you joy?",
  "How do you make guests feel welcome?",
  "What's your ideal way to spend a Saturday at home?",
  "What smell makes you feel most at home?",
  "If you could live anywhere for a year, where would you go?",
  "What's your favorite thing about your neighborhood?",
  "How has your idea of the perfect home changed over time?"
];

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
