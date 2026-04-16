// src/lib/ai/tutorAI.ts

import { Message, QuizQuestion, Quiz } from '@/types/tutor';

// Mock responses for offline/demo mode
const mockResponses: Record<string, { en: string; hi: string }> = {
  'pythagorean theorem': {
    en: "📐 **Pythagorean Theorem**: a² + b² = c²\n\n**Example**: In a right triangle with sides 3 and 4:\n3² + 4² = 9 + 16 = 25\n√25 = 5 (hypotenuse)\n\n**Real-life use**: Finding diagonal of a TV screen!",
    hi: "📐 **पाइथागोरस प्रमेय**: a² + b² = c²\n\n**उदाहरण**: 3 और 4 भुजा वाले त्रिभुज में:\n3² + 4² = 9 + 16 = 25\n√25 = 5 (कर्ण)\n\n**वास्तविक उपयोग**: टीवी स्क्रीन का विकर्ण निकालना!"
  },
  'photosynthesis': {
    en: "🌱 **Photosynthesis**: Plants convert sunlight, CO₂, and water into glucose and oxygen.\n\n**Formula**: 6CO₂ + 6H₂O + Light → C₆H₁₂O₆ + 6O₂\n\n**Fun Fact**: Plants release the oxygen we breathe!",
    hi: "🌱 **प्रकाश संश्लेषण**: पौधे सूर्य प्रकाश, CO₂ और पानी को ग्लूकोज और ऑक्सीजन में बदलते हैं।\n\n**सूत्र**: 6CO₂ + 6H₂O + Light → C₆H₁₂O₆ + 6O₂\n\n**मजेदार तथ्य**: पौधे वह ऑक्सीजन छोड़ते हैं जो हम सांस लेते हैं!"
  },
  'noun': {
    en: "📚 **Noun**: A word that names a person, place, thing, or idea.\n\n**Examples**:\n• Person: teacher, doctor, Raj\n• Place: school, park, Mumbai\n• Thing: book, phone, table\n• Idea: love, happiness, freedom",
    hi: "📚 **संज्ञा**: वह शब्द जो किसी व्यक्ति, स्थान, वस्तु या विचार का नाम बताता है।\n\n**उदाहरण**:\n• व्यक्ति: शिक्षक, डॉक्टर, राहुल\n• स्थान: स्कूल, पार्क, दिल्ली\n• वस्तु: किताब, फोन, मेज\n• विचार: प्यार, खुशी, आज़ादी"
  }
};

// Predefined quiz questions
const quizBank: Record<string, QuizQuestion[]> = {
  math: [
    {
      id: 1,
      question: "What is the value of π (pi) approximately?",
      options: ["3.14", "2.71", "1.61", "4.13"],
      correctAnswer: 0,
      explanation: "π (pi) is approximately 3.14159, commonly rounded to 3.14"
    },
    {
      id: 2,
      question: "What is 15 × 8?",
      options: ["100", "110", "120", "130"],
      correctAnswer: 2,
      explanation: "15 × 8 = 120. Multiply 10 × 8 = 80, plus 5 × 8 = 40, total 120"
    },
    {
      id: 3,
      question: "What is the square root of 144?",
      options: ["10", "11", "12", "13"],
      correctAnswer: 2,
      explanation: "12 × 12 = 144, so √144 = 12"
    }
  ],
  science: [
    {
      id: 1,
      question: "Which planet is known as the Red Planet?",
      options: ["Jupiter", "Mars", "Venus", "Saturn"],
      correctAnswer: 1,
      explanation: "Mars appears red due to iron oxide (rust) on its surface"
    },
    {
      id: 2,
      question: "What is the hardest natural substance?",
      options: ["Iron", "Gold", "Diamond", "Platinum"],
      correctAnswer: 2,
      explanation: "Diamond is the hardest natural material known"
    }
  ],
  english: [
    {
      id: 1,
      question: "What is the past tense of 'go'?",
      options: ["Goed", "Went", "Gone", "Going"],
      correctAnswer: 1,
      explanation: "'Went' is the past tense of 'go'"
    }
  ]
};

export class AITutorService {
  private conversationContext: Map<string, string> = new Map();
  private dailyQuestionCount: Map<string, number> = new Map();
  private readonly MAX_DAILY_QUESTIONS = 50;

  constructor(private userId: string) {}

  async askQuestion(question: string, language: 'en' | 'hi' = 'en'): Promise<string> {
    // Rate limiting check
    const today = new Date().toDateString();
    const key = `${this.userId}-${today}`;
    const count = this.dailyQuestionCount.get(key) || 0;
    
    if (count >= this.MAX_DAILY_QUESTIONS) {
      return language === 'en' 
        ? "⚠️ You've reached your daily limit of 50 questions. Please try again tomorrow!"
        : "⚠️ आप अपनी दैनिक सीमा 50 प्रश्नों तक पहुँच चुके हैं। कृपया कल फिर से प्रयास करें!";
    }

    // Update counter
    this.dailyQuestionCount.set(key, count + 1);

    // Check for language switch
    if (question.toLowerCase().includes('in hindi') || question.toLowerCase().includes('हिंदी')) {
      language = 'hi';
      question = question.replace(/in hindi|हिंदी/gi, '').trim();
    }

    // Check for follow-up context
    const lastTopic = this.conversationContext.get(this.userId);
    let contextualQuestion = question;
    if (lastTopic && (question.includes('more') || question.includes('examples') || question.includes('explain'))) {
      contextualQuestion = `${lastTopic} ${question}`;
    }

    // Try to get from cache first (offline support)
    const cached = this.getCachedResponse(contextualQuestion, language);
    if (cached) {
      return cached;
    }

    // Mock response (replace with actual API call)
    let response = await this.getMockResponse(contextualQuestion, language);
    
    // Store context
    this.conversationContext.set(this.userId, contextualQuestion);
    
    // Cache response
    this.cacheResponse(contextualQuestion, response, language);
    
    return response;
  }

  private async getMockResponse(question: string, language: 'en' | 'hi'): Promise<string> {
    const lowerQuestion = question.toLowerCase();
    
    // Check for known topics
    for (const [key, value] of Object.entries(mockResponses)) {
      if (lowerQuestion.includes(key)) {
        return value[language];
      }
    }

    // Generic responses
    if (language === 'en') {
      return `🤖 I understand you're asking about "${question}".\n\nI'm here to help! Could you please:\n1. Be more specific about what you want to learn\n2. Ask about Math, Science, English, or Computer basics\n3. Type "Take a quiz" to test your knowledge\n\nExample: "Explain photosynthesis" or "What is a noun?"`;
    } else {
      return `🤖 आप "${question}" के बारे में पूछ रहे हैं।\n\nमैं आपकी मदद कर सकता हूँ! कृपया:\n1. और विशिष्ट बनें\n2. गणित, विज्ञान, अंग्रेजी, या कंप्यूटर के बारे में पूछें\n3. अपने ज्ञान का परीक्षण करने के लिए "क्विज लें" टाइप करें\n\nउदाहरण: "प्रकाश संश्लेषण समझाएं" या "संज्ञा क्या है?"`;
    }
  }

  async generateQuiz(subject: string, difficulty: 'easy' | 'medium' | 'hard'): Promise<Quiz> {
    const questions = quizBank[subject] || quizBank.math;
    const selectedQuestions = questions.slice(0, 5).map(q => ({ ...q }));
    
    return {
      id: Date.now().toString(),
      subject,
      difficulty,
      questions: selectedQuestions
    };
  }

  private getCachedResponse(question: string, language: string): string | null {
    if (typeof window === 'undefined') return null;
    
    const cacheKey = `${question}-${language}`;
    const cached = localStorage.getItem(`tutor_cache_${cacheKey}`);
    
    if (cached) {
      const data: CachedResponse = JSON.parse(cached);
      const isExpired = Date.now() - data.timestamp > 7 * 24 * 60 * 60 * 1000; // 7 days
      if (!isExpired) {
        return data.answer;
      }
    }
    return null;
  }

  private cacheResponse(question: string, answer: string, language: string): void {
    if (typeof window === 'undefined') return;
    
    const cacheKey = `${question}-${language}`;
    const cacheData: CachedResponse = {
      question,
      answer,
      timestamp: Date.now(),
      language
    };
    localStorage.setItem(`tutor_cache_${cacheKey}`, JSON.stringify(cacheData));
  }

  getRemainingQuestions(): number {
    const today = new Date().toDateString();
    const key = `${this.userId}-${today}`;
    const count = this.dailyQuestionCount.get(key) || 0;
    return this.MAX_DAILY_QUESTIONS - count;
  }
}