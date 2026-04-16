// src/components/learning/QuizGenerator.tsx
'use client';

import { useState } from 'react';
import { X, Check, XCircle, HelpCircle, ArrowRight } from 'lucide-react';
import { Quiz, QuizQuestion } from '@/types/tutor';
import { AITutorService } from '@/lib/ai/tutorAI';

interface QuizGeneratorProps {
  onClose: () => void;
  onQuizComplete: (score: number, total: number) => void;
  language: 'en' | 'hi';
}

export default function QuizGenerator({ onClose, onQuizComplete, language }: QuizGeneratorProps) {
  const [subjects] = useState([
    { id: 'math', name: language === 'en' ? 'Mathematics' : 'गणित', icon: '📐' },
    { id: 'science', name: language === 'en' ? 'Science' : 'विज्ञान', icon: '🔬' },
    { id: 'english', name: language === 'en' ? 'English' : 'अंग्रेजी', icon: '📚' },
  ]);
  
  const [difficulties] = useState([
    { id: 'easy', name: language === 'en' ? 'Easy' : 'आसान', color: 'text-green-600' },
    { id: 'medium', name: language === 'en' ? 'Medium' : 'मध्यम', color: 'text-yellow-600' },
    { id: 'hard', name: language === 'en' ? 'Hard' : 'कठिन', color: 'text-red-600' },
  ]);
  
  const [selectedSubject, setSelectedSubject] = useState('math');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const tutorService = new AITutorService('quiz-user');

  const generateQuiz = async () => {
    setLoading(true);
    try {
      const newQuiz = await tutorService.generateQuiz(selectedSubject, selectedDifficulty);
      setQuiz(newQuiz);
      setAnswers(new Array(newQuiz.questions.length).fill(-1));
      setCurrentQuestion(0);
      setShowResults(false);
    } catch (error) {
      console.error('Quiz generation error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < (quiz?.questions.length || 0) - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore();
    }
  };

  const calculateScore = () => {
    if (!quiz) return;
    
    let score = 0;
    quiz.questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) {
        score++;
      }
    });
    setShowResults(true);
    onQuizComplete(score, quiz.questions.length);
  };

  if (!quiz && !showResults) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-md w-full p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              {language === 'en' ? 'Generate a Quiz' : 'क्विज़ बनाएं'}
            </h3>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                {language === 'en' ? 'Select Subject' : 'विषय चुनें'}
              </label>
              <div className="grid grid-cols-3 gap-3">
                {subjects.map((subject) => (
                  <button
                    key={subject.id}
                    onClick={() => setSelectedSubject(subject.id)}
                    className={`p-3 border rounded-lg text-center transition ${
                      selectedSubject === subject.id
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="text-2xl mb-1">{subject.icon}</div>
                    <div className="text-sm">{subject.name}</div>
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                {language === 'en' ? 'Select Difficulty' : 'कठिनाई स्तर चुनें'}
              </label>
              <div className="grid grid-cols-3 gap-3">
                {difficulties.map((diff) => (
                  <button
                    key={diff.id}
                    onClick={() => setSelectedDifficulty(diff.id as any)}
                    className={`p-3 border rounded-lg text-center transition ${
                      selectedDifficulty === diff.id
                        ? `border-purple-500 bg-purple-50 ${diff.color}`
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="text-sm font-medium">{diff.name}</div>
                  </button>
                ))}
              </div>
            </div>
            
            <button
              onClick={generateQuiz}
              disabled={loading}
              className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {language === 'en' ? 'Generating...' : 'बना रहा है...'}
                </span>
              ) : (
                language === 'en' ? 'Start Quiz' : 'क्विज़ शुरू करें'
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showResults && quiz) {
    const score = answers.filter((a, i) => a === quiz.questions[i].correctAnswer).length;
    const percentage = (score / quiz.questions.length) * 100;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div className="bg-white rounded-xl max-w-2xl w-full p-6">
          <div className="text-center mb-6">
            <div className={`text-6xl mb-4 ${percentage >= 70 ? 'text-green-600' : percentage >= 40 ? 'text-yellow-600' : 'text-red-600'}`}>
              {percentage >= 70 ? '🎉' : percentage >= 40 ? '👍' : '📚'}
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {language === 'en' ? 'Quiz Completed!' : 'क्विज़ पूर्ण हुआ!'}
            </h3>
            <p className="text-gray-600 mt-2">
              {language === 'en' 
                ? `You scored ${score} out of ${quiz.questions.length} (${percentage}%)`
                : `आपने ${quiz.questions.length} में से ${score} अंक प्राप्त किए (${percentage}%)`}
            </p>
          </div>
          
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {quiz.questions.map((q, idx) => (
              <div key={q.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {idx + 1}. {q.question}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      {language === 'en' ? 'Your answer:' : 'आपका उत्तर:'}{' '}
                      <span className={answers[idx] === q.correctAnswer ? 'text-green-600' : 'text-red-600'}>
                        {q.options[answers[idx]] || (language === 'en' ? 'Not answered' : 'उत्तर नहीं दिया')}
                      </span>
                    </p>
                    {answers[idx] !== q.correctAnswer && (
                      <p className="text-sm text-green-600 mt-1">
                        {language === 'en' ? 'Correct answer:' : 'सही उत्तर:'} {q.options[q.correctAnswer]}
                      </p>
                    )}
                    <div className="mt-2 p-2 bg-blue-50 rounded text-sm text-blue-800">
                      <HelpCircle className="h-3 w-3 inline mr-1" />
                      {q.explanation}
                    </div>
                  </div>
                  <div>
                    {answers[idx] === q.correctAnswer ? (
                      <Check className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex space-x-3 mt-6">
            <button
              onClick={generateQuiz}
              className="flex-1 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50"
            >
              {language === 'en' ? 'Try Another Quiz' : 'नया क्विज़ लें'}
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              {language === 'en' ? 'Close' : 'बंद करें'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (quiz) {
    const currentQ = quiz.questions[currentQuestion];
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-md w-full p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <span className="text-sm text-gray-500">
                {language === 'en' ? 'Question' : 'प्रश्न'} {currentQuestion + 1}/{quiz.questions.length}
              </span>
              <h3 className="text-lg font-bold text-gray-900 mt-1">{currentQ.question}</h3>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className={`w-full p-3 text-left border rounded-lg transition ${
                  answers[currentQuestion] === idx
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <span className="font-medium mr-3">{String.fromCharCode(65 + idx)}.</span>
                {option}
              </button>
            ))}
          </div>
          
          <button
            onClick={nextQuestion}
            disabled={answers[currentQuestion] === -1}
            className="w-full mt-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {currentQuestion === quiz.questions.length - 1 
              ? (language === 'en' ? 'Submit Quiz' : 'क्विज़ जमा करें')
              : (language === 'en' ? 'Next Question' : 'अगला प्रश्न')}
            <ArrowRight className="h-4 w-4 ml-2" />
          </button>
        </div>
      </div>
    );
  }

  return null;
}