// src/types/tutor.ts

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  language?: 'en' | 'hi';
  context?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questions: QuizQuestion[];
  score?: number;
}

export interface TutorContext {
  subject: string;
  lastTopic: string;
  conversationHistory: Message[];
  languagePreference: 'en' | 'hi';
}

export interface CachedResponse {
  question: string;
  answer: string;
  timestamp: number;
  language: string;
}