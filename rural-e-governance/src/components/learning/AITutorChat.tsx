// src/components/learning/AITutorChat.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Mic, 
  Volume2, 
  Brain, 
  Sparkles,
  Clock,
  Globe,
  BookOpen,
  Loader2
} from 'lucide-react';
import { AITutorService } from '@/lib/ai/tutorAI';
import { Message, Quiz } from '@/types/tutor';
import QuizGenerator from './QuizGenerator';

interface AITutorChatProps {
  userId?: string;
}

export default function AITutorChat({ userId = 'user-123' }: AITutorChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "👋 Namaste! I'm your AI Tutor. I can help you with Math, Science, English, and Computer basics. Ask me anything!\n\n💡 Try: 'Explain Pythagorean theorem' or 'What is photosynthesis?'\n🌐 Type 'in Hindi' for Hindi responses\n📝 Type 'Take a quiz' to test yourself!",
      sender: 'ai',
      timestamp: new Date(),
      language: 'en'
    }
  ]);
  
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [remainingQuestions, setRemainingQuestions] = useState(50);
  const [showQuiz, setShowQuiz] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const tutorService = useRef(new AITutorService(userId));
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    setRemainingQuestions(tutorService.current.getRemainingQuestions());
    scrollToBottom();
    
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = language === 'en' ? 'en-US' : 'hi-IN';
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };
      
      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    // Check for quiz request
    if (input.toLowerCase().includes('take a quiz') || input.toLowerCase().includes('quiz')) {
      setShowQuiz(true);
      setInput('');
      return;
    }
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
      language
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Get AI response
      const response = await tutorService.current.askQuestion(input, language);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'ai',
        timestamp: new Date(),
        language
      };
      setMessages(prev => [...prev, aiMessage]);
      
      // Update remaining questions
      setRemainingQuestions(tutorService.current.getRemainingQuestions());
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: language === 'en' 
          ? "⚠️ Sorry, I'm having trouble right now. Please try again in a moment."
          : "⚠️ क्षमा करें, मुझे अभी परेशानी हो रही है। कृपया कुछ देर बाद प्रयास करें।",
        sender: 'ai',
        timestamp: new Date(),
        language
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
  };

  const handleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert('Voice input is not supported in your browser');
      return;
    }
    
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.lang = language === 'en' ? 'en-US' : 'hi-IN';
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'en' ? 'en-US' : 'hi-IN';
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'hi' : 'en';
    setLanguage(newLang);
    
    const langMessage: Message = {
      id: Date.now().toString(),
      text: newLang === 'en' 
        ? "🌐 Language switched to English. You can continue asking questions!"
        : "🌐 भाषा हिंदी में बदल दी गई है। आप प्रश्न पूछना जारी रख सकते हैं!",
      sender: 'ai',
      timestamp: new Date(),
      language: newLang
    };
    setMessages(prev => [...prev, langMessage]);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Brain className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold">AI Tutor</h2>
              <p className="text-xs opacity-90">Powered by AI • Learn at your pace</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 bg-white/20 px-3 py-1 rounded-full text-sm">
              <Clock className="h-3 w-3" />
              <span>{remainingQuestions}/50 questions left today</span>
            </div>
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm">{language === 'en' ? 'English' : 'हिंदी'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[500px]">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-3 ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <div className="whitespace-pre-wrap text-sm">
                {message.text}
              </div>
              {message.sender === 'ai' && (
                <button
                  onClick={() => speakText(message.text)}
                  className="mt-2 text-xs opacity-70 hover:opacity-100 flex items-center"
                >
                  <Volume2 className="h-3 w-3 mr-1" />
                  Listen
                </button>
              )}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl p-3">
              <div className="flex space-x-1">
                <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce delay-150"></div>
                <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce delay-300"></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t p-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleVoiceInput}
            className={`p-3 rounded-full transition ${
              isListening 
                ? 'bg-red-500 text-white animate-pulse' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Mic className="h-5 w-5" />
          </button>
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={
              language === 'en' 
                ? "Ask me anything... (Math, Science, English)" 
                : "कुछ भी पूछें... (गणित, विज्ञान, अंग्रेजी)"
            }
            className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={isLoading}
          />
          
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="p-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          </button>
        </div>
        
        <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Sparkles className="h-3 w-3 mr-1 text-purple-600" />
              <span>50+ topics</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="h-3 w-3 mr-1 text-blue-600" />
              <span>Quiz available</span>
            </div>
          </div>
          <button
            onClick={() => setShowQuiz(true)}
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            Take a Quiz →
          </button>
        </div>
      </div>

      {/* Quiz Modal */}
      {showQuiz && (
        <QuizGenerator
          onClose={() => setShowQuiz(false)}
          onQuizComplete={(score, total) => {
            const resultMessage: Message = {
              id: Date.now().toString(),
              text: language === 'en'
                ? `🎉 Great job! You scored ${score}/${total} on the quiz! ${score === total ? 'Perfect score! 🌟' : 'Keep practicing! 💪'}`
                : `🎉 बहुत बढ़िया! आपने क्विज़ में ${score}/${total} अंक प्राप्त किए! ${score === total ? 'परफेक्ट स्कोर! 🌟' : 'अभ्यास करते रहें! 💪'}`,
              sender: 'ai',
              timestamp: new Date(),
              language
            };
            setMessages(prev => [...prev, resultMessage]);
            setShowQuiz(false);
          }}
          language={language}
        />
      )}
    </div>
  );
}