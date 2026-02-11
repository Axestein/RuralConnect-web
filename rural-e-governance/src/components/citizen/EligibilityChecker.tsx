// src/components/citizen/EligibilityChecker.tsx
'use client';

import { useState } from 'react';
import { 
  X, 
  User, 
  Home, 
  Users, 
  Landmark,
  Calendar,
  IndianRupee,
  Leaf,
  Heart,
  GraduationCap,
  Briefcase,
  CheckCircle,
  Sparkles,
  ArrowRight,
  Award,
  Target,
  FileCheck,
  TrendingUp
} from 'lucide-react';

interface EligibilityCheckerProps {
  onClose: () => void;
}

export default function EligibilityChecker({ onClose }: EligibilityCheckerProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    maritalStatus: '',
    familySize: '',
    annualIncome: '',
    occupation: '',
    education: '',
    caste: '',
    landOwnership: '',
    bplStatus: '',
    location: '',
  });

  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const questions = [
    {
      id: 'age',
      question: 'What is your age?',
      type: 'number',
      icon: User,
      placeholder: 'Enter your age',
    },
    {
      id: 'gender',
      question: 'Select your gender',
      type: 'select',
      icon: Users,
      options: ['Male', 'Female', 'Other'],
    },
    {
      id: 'maritalStatus',
      question: 'What is your marital status?',
      type: 'select',
      icon: Heart,
      options: ['Single', 'Married', 'Widowed', 'Divorced'],
    },
    {
      id: 'familySize',
      question: 'Number of family members?',
      type: 'number',
      icon: Users,
      placeholder: 'Total members in family',
    },
    {
      id: 'annualIncome',
      question: 'What is your annual household income?',
      type: 'select',
      icon: IndianRupee,
      options: [
        'Less than ₹50,000',
        '₹50,000 - ₹1,00,000',
        '₹1,00,000 - ₹2,00,000',
        '₹2,00,000 - ₹5,00,000',
        'Above ₹5,00,000',
      ],
    },
    {
      id: 'occupation',
      question: 'What is your primary occupation?',
      type: 'select',
      icon: Briefcase,
      options: [
        'Farmer',
        'Agricultural Labor',
        'Daily Wage Laborer',
        'Self Employed',
        'Government Employee',
        'Private Employee',
        'Unemployed',
        'Student',
        'Retired',
      ],
    },
    {
      id: 'education',
      question: 'What is your highest education level?',
      type: 'select',
      icon: GraduationCap,
      options: [
        'No Formal Education',
        'Primary School',
        'Middle School',
        'High School',
        'Intermediate',
        'Graduate',
        'Post Graduate',
      ],
    },
    {
      id: 'landOwnership',
      question: 'Do you own agricultural land?',
      type: 'select',
      icon: Leaf,
      options: [
        'No land',
        'Less than 1 acre',
        '1-2 acres',
        '2-5 acres',
        'More than 5 acres',
      ],
    },
    {
      id: 'bplStatus',
      question: 'Do you have a BPL ration card?',
      type: 'select',
      icon: Target,
      options: ['Yes', 'No'],
    },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNext = () => {
    if (step < questions.length) {
      setStep(step + 1);
    } else {
      checkEligibility();
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const checkEligibility = () => {
    setLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const mockResults = [
        {
          id: 'pm-kisan',
          name: 'PM-Kisan Samman Nidhi',
          matchScore: 95,
          benefits: '₹6,000 per year',
          eligibility: [
            '✓ Land ownership confirmed',
            '✓ Income criteria met',
            '✓ Valid Aadhaar linked',
          ],
          deadline: 'Mar 31, 2024',
          icon: Leaf,
        },
        {
          id: 'ayushman',
          name: 'Ayushman Bharat Yojana',
          matchScore: 87,
          benefits: '₹5,00,000 health cover',
          eligibility: [
            '✓ BPL category eligible',
            '✓ Family size matched',
            '✓ No existing coverage',
          ],
          deadline: 'Ongoing',
          icon: Heart,
        },
        {
          id: 'ujjwala',
          name: 'Ujjwala Yojana',
          matchScore: 76,
          benefits: 'Free LPG Connection',
          eligibility: [
            '✓ Women in household',
            '✓ BPL status confirmed',
            '✓ No existing connection',
          ],
          deadline: 'Dec 31, 2024',
          icon: Home,
        },
        {
          id: 'pm-awas',
          name: 'PM Awas Yojana',
          matchScore: 82,
          benefits: '₹1.2L - ₹2.5L housing aid',
          eligibility: [
            '✓ No pucca house',
            '✓ Income criteria met',
            '✓ Eligible location',
          ],
          deadline: 'Jun 30, 2024',
          icon: Home,
        },
      ];
      
      setResults(mockResults);
      setLoading(false);
      setStep(questions.length + 1);
    }, 2000);
  };

  const currentQuestion = questions[step - 1];
  const ProgressIcon = currentQuestion?.icon || Sparkles;
  const progress = (step / (questions.length + 1)) * 100;

  return (
    <div className="relative">
      {/* Header */}
      <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-cyan-600 p-6 rounded-t-3xl text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Sparkles className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold">AI Eligibility Checker</h2>
              <p className="text-white/80 text-sm mt-1">Get personalized scheme recommendations</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Step {step} of {questions.length + 1}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full">
            <div 
              className="h-2 bg-white rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="p-6">
        {step <= questions.length ? (
          /* Question Step */
          <div className="space-y-6">
            <div className="flex items-center space-x-4 mb-8">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl">
                <ProgressIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {currentQuestion.question}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  This helps us find the best schemes for you
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {currentQuestion.type === 'select' ? (
                <div className="grid gap-3">
                  {currentQuestion.options?.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleInputChange(currentQuestion.id, option)}
                      className={`w-full p-4 text-left border rounded-xl transition-all ${
                        formData[currentQuestion.id as keyof typeof formData] === option
                          ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-md'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              ) : (
                <input
                  type={currentQuestion.type}
                  value={formData[currentQuestion.id as keyof typeof formData] as string}
                  onChange={(e) => handleInputChange(currentQuestion.id, e.target.value)}
                  placeholder={currentQuestion.placeholder}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              )}
            </div>

            <div className="flex justify-between pt-6">
              <button
                onClick={handlePrevious}
                disabled={step === 1}
                className="px-6 py-3 border border-gray-200 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={!formData[currentQuestion.id as keyof typeof formData]}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 flex items-center"
              >
                {step === questions.length ? 'Check Eligibility' : 'Next'}
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
            </div>
          </div>
        ) : (
          /* Results Step */
          <div className="space-y-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="relative inline-flex">
                  <div className="w-20 h-20 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
                  <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mt-6">
                  Analyzing Your Profile
                </h3>
                <p className="text-gray-600 mt-2">
                  Our AI is matching you with eligible government schemes...
                </p>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <div className="inline-flex p-4 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full mb-4">
                    <CheckCircle className="h-12 w-12 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Eligibility Check Complete!
                  </h3>
                  <p className="text-gray-600 mt-2">
                    We found {results.length} schemes you may be eligible for
                  </p>
                </div>

                <div className="space-y-4">
                  {results.map((scheme, index) => (
                    <div
                      key={scheme.id}
                      className="border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-lg transition-all group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-3">
                            <div className="p-2 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg mr-3">
                              <scheme.icon className="h-5 w-5 text-blue-600" />
                            </div>
                            <h4 className="font-semibold text-gray-900">{scheme.name}</h4>
                            <span className="ml-3 px-3 py-1 bg-emerald-100 text-emerald-700 text-sm rounded-full">
                              {scheme.matchScore}% Match
                            </span>
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-4 mt-4">
                            <div>
                              <p className="text-sm text-gray-500 mb-2">Benefits</p>
                              <p className="font-medium text-gray-900">{scheme.benefits}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 mb-2">Deadline</p>
                              <p className="font-medium text-gray-900">{scheme.deadline}</p>
                            </div>
                          </div>

                          <div className="mt-4">
                            <p className="text-sm text-gray-500 mb-2">Why you're eligible:</p>
                            <ul className="space-y-1">
                              {scheme.eligibility.map((item: string, i: number) => (
                                <li key={i} className="text-sm text-gray-700 flex items-start">
                                  <span className="text-emerald-600 mr-2">✓</span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="ml-6 flex flex-col space-y-3">
                          <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 whitespace-nowrap">
                            Apply Now
                          </button>
                          <button className="px-6 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 whitespace-nowrap">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center pt-6">
                  <button
                    onClick={() => {
                      setStep(1);
                      setFormData({});
                      setResults([]);
                    }}
                    className="px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50"
                  >
                    Check Again
                  </button>
                  <button
                    onClick={onClose}
                    className="px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-black ml-3"
                  >
                    Save Results
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}