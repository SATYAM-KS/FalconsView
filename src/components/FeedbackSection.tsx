import React from 'react';
import { CheckCircle, AlertTriangle, Lightbulb, TrendingUp } from 'lucide-react';

interface FeedbackSectionProps {
  feedback: {
    strengths: string[];
    improvements: string[];
    suggestions: string[];
  };
  patterns: {
    hesitationCount: number;
    averagePause: number;
    speechRate: number;
    fillerWords: number;
    interruptionsHandled: number;
  };
}

const FeedbackSection: React.FC<FeedbackSectionProps> = ({ feedback, patterns }) => {
  const FeedbackCard = ({ 
    title, 
    items, 
    icon, 
    bgColor, 
    borderColor, 
    textColor 
  }: {
    title: string;
    items: string[];
    icon: React.ReactNode;
    bgColor: string;
    borderColor: string;
    textColor: string;
  }) => (
    <div className={`${bgColor} rounded-xl border ${borderColor} p-6`}>
      <div className="flex items-center space-x-3 mb-4">
        <div className={`p-2 rounded-lg ${textColor}`}>
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      </div>
      
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-1">
              <div className="w-2 h-2 bg-current rounded-full opacity-60" />
            </div>
            <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  const getPatternStatus = (value: number, good: number, warning: number) => {
    if (value <= good) return 'excellent';
    if (value <= warning) return 'good';
    return 'needs-work';
  };

  const PatternInsight = ({ 
    label, 
    value, 
    unit, 
    status, 
    insight 
  }: {
    label: string;
    value: number;
    unit: string;
    status: 'excellent' | 'good' | 'needs-work';
    insight: string;
  }) => (
    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <div className="flex-1">
        <div className="flex items-center space-x-3">
          <span className="font-medium text-gray-900 dark:text-white">{label}</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            status === 'excellent' ? 'bg-green-100 text-green-800' :
            status === 'good' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {status === 'excellent' ? 'Excellent' : status === 'good' ? 'Good' : 'Needs Work'}
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{insight}</p>
      </div>
      <div className="text-right">
        <div className="text-xl font-bold text-gray-900 dark:text-white">{value}{unit}</div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Detailed Feedback</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Comprehensive analysis with actionable recommendations for improvement
        </p>
      </div>

      {/* Feedback Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        <FeedbackCard
          title="Strengths"
          items={feedback.strengths}
          icon={<CheckCircle className="w-5 h-5" />}
          bgColor="bg-green-50 dark:bg-green-900/20"
          borderColor="border-green-200 dark:border-green-800"
          textColor="text-green-600"
        />
        
        <FeedbackCard
          title="Areas for Improvement"
          items={feedback.improvements}
          icon={<AlertTriangle className="w-5 h-5" />}
          bgColor="bg-yellow-50 dark:bg-yellow-900/20"
          borderColor="border-yellow-200 dark:border-yellow-800"
          textColor="text-yellow-600"
        />
        
        <FeedbackCard
          title="Suggestions"
          items={feedback.suggestions}
          icon={<Lightbulb className="w-5 h-5" />}
          bgColor="bg-blue-50 dark:bg-blue-900/20"
          borderColor="border-blue-200 dark:border-blue-800"
          textColor="text-blue-600"
        />
      </div>

      {/* Pattern Analysis */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Speech Pattern Analysis</h3>
        </div>
        
        <div className="space-y-4">
          <PatternInsight
            label="Speech Rate"
            value={patterns.speechRate}
            unit=" WPM"
            status={patterns.speechRate >= 140 && patterns.speechRate <= 160 ? 'excellent' : 'good'}
            insight="Optimal range is 140-160 words per minute for clear communication"
          />
          
          <PatternInsight
            label="Hesitation Count"
            value={patterns.hesitationCount}
            unit=""
            status={getPatternStatus(patterns.hesitationCount, 8, 15)}
            insight="Frequent hesitations may indicate uncertainty or lack of preparation"
          />
          
          <PatternInsight
            label="Filler Words"
            value={patterns.fillerWords}
            unit=""
            status={getPatternStatus(patterns.fillerWords, 12, 20)}
            insight="Reducing filler words improves clarity and professionalism"
          />
          
          <PatternInsight
            label="Average Pause Length"
            value={patterns.averagePause}
            unit="s"
            status={patterns.averagePause <= 2 ? 'excellent' : patterns.averagePause <= 3 ? 'good' : 'needs-work'}
            insight="Strategic pauses are good, but excessive length may indicate hesitation"
          />
          
          <PatternInsight
            label="Interruptions Handled"
            value={patterns.interruptionsHandled}
            unit=""
            status="excellent"
            insight="Successfully managing interruptions shows good communication skills"
          />
        </div>
      </div>

      {/* Action Plan */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-6">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-4">Recommended Action Plan</h3>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
              1
            </div>
            <div>
              <h4 className="font-medium text-blue-900 dark:text-blue-300">Immediate Actions (This Week)</h4>
              <p className="text-blue-800 dark:text-blue-300 text-sm mt-1">
                Practice reducing filler words by recording yourself for 5 minutes daily. 
                Focus on pausing instead of saying "um" or "uh".
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
              2
            </div>
            <div>
              <h4 className="font-medium text-blue-900 dark:text-blue-300">Short-term Goals (2-4 Weeks)</h4>
              <p className="text-blue-800 dark:text-blue-300 text-sm mt-1">
                Conduct mock interviews with friends or mentors. Practice the STAR method 
                for behavioral questions to reduce hesitation.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
              3
            </div>
            <div>
              <h4 className="font-medium text-blue-900 dark:text-blue-300">Long-term Development (1-3 Months)</h4>
              <p className="text-blue-800 dark:text-blue-300 text-sm mt-1">
                Join a public speaking group like Toastmasters or take an online course 
                on interview skills to build lasting confidence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackSection;