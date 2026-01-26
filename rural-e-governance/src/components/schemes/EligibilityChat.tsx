// src/components/schemes/EligibilityChat.tsx
'use client';

import { useState } from 'react';
import { Send, User, Bot } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

export default function EligibilityChat() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! I'm your government scheme assistant. I can help you check eligibility for various schemes. Please tell me about yourself.", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user'
    };
    setMessages([...messages, userMessage]);
    setInput('');
    setIsTyping(true);

    // Mock AI response
    setTimeout(() => {
      const responses = [
        "Based on your details, you might be eligible for: PM-Kisan Scheme, Ayushman Bharat, and Ujjwala Yojana.",
        "Please share your annual income for more specific recommendations.",
        "For agricultural schemes, you'll need to provide land ownership documents.",
        "I recommend checking the PMAY-G scheme for housing if you don't own a pucca house."
      ];
      
      const botMessage: Message = {
        id: messages.length + 2,
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'bot'
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-xl shadow-md">
      <div className="p-4 border-b">
        <h3 className="font-semibold text-lg">Scheme Eligibility Assistant</h3>
        <p className="text-sm text-gray-600">Ask about PM-Kisan, Ayushman Bharat, MNREGA, etc.</p>
      </div>

      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-blue-100 text-blue-900'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.sender === 'bot' ? (
                  <Bot className="h-5 w-5 mt-1 flex-shrink-0" />
                ) : (
                  <User className="h-5 w-5 mt-1 flex-shrink-0" />
                )}
                <p>{message.text}</p>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="flex space-x-1">
                <div className="h-2 w-2 bg-gray-500 rounded-full animate-pulse"></div>
                <div className="h-2 w-2 bg-gray-500 rounded-full animate-pulse delay-150"></div>
                <div className="h-2 w-2 bg-gray-500 rounded-full animate-pulse delay-300"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about schemes (e.g., 'Am I eligible for PM-Kisan?')"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Try: "I'm a farmer with 2 acres land. Which schemes can I apply?"
        </p>
      </div>
    </div>
  );
}