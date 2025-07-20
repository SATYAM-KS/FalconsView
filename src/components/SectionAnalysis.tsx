import React from 'react';
import { Clock, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

interface Section {
  title: string;
  timeRange: string;
  score: number;
  issues: string[];
  highlights: string[];
}

interface SectionAnalysisProps {
  sections: Section[];
}

const SectionAnalysis: React.FC<SectionAnalysisProps> = ({ sections }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getScoreBorder = (score: number) => {
    if (score >= 80) return 'border-green-200';
    if (score >= 60) return 'border-yellow-200';
    return 'border-red-200';
  };

  const averageScore = Math.round(sections.reduce((sum, section) => sum + section.score, 0) / sections.length);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Section-by-Section Analysis</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Detailed breakdown of performance across different interview segments
        </p>
      </div>

      {/* Summary Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Interview Overview</h3>
          <div className={`px-4 py-2 rounded-lg ${getScoreBg(averageScore)} ${getScoreBorder(averageScore)} border`}>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Average Score:</span>
            <span className={`ml-2 text-lg font-bold ${getScoreColor(averageScore)}`}>
              {averageScore}/100
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {sections.filter(s => s.score >= 80).length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Strong Sections</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600 mb-1">
              {sections.filter(s => s.score >= 60 && s.score < 80).length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Good Sections</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600 mb-1">
              {sections.filter(s => s.score < 60).length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Needs Improvement</div>
          </div>
        </div>
      </div>

      {/* Section Cards */}
      <div className="space-y-6">
        {sections.map((section, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Section Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className={`w-10 h-10 rounded-lg ${getScoreBg(section.score)} ${getScoreBorder(section.score)} border flex items-center justify-center`}>
                      <span className={`font-bold ${getScoreColor(section.score)}`}>
                        {index + 1}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{section.title}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>{section.timeRange}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`text-2xl font-bold ${getScoreColor(section.score)} mb-1`}>
                    {section.score}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Score</div>
                </div>
              </div>

              {/* Score Bar */}
              <div className="mt-4">
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      section.score >= 80 ? 'bg-green-500' : 
                      section.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${section.score}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Section Content */}
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Highlights */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <h4 className="font-medium text-gray-900 dark:text-white">Highlights</h4>
                  </div>
                  {section.highlights.length > 0 ? (
                    <ul className="space-y-2">
                      {section.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <div className="flex-shrink-0 w-1.5 h-1.5 bg-green-500 rounded-full mt-2" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400 italic">No specific highlights identified</p>
                  )}
                </div>

                {/* Issues */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <AlertCircle className="w-5 h-5 text-orange-600" />
                    <h4 className="font-medium text-gray-900 dark:text-white">Areas for Improvement</h4>
                  </div>
                  {section.issues.length > 0 ? (
                    <ul className="space-y-2">
                      {section.issues.map((issue, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <div className="flex-shrink-0 w-1.5 h-1.5 bg-orange-500 rounded-full mt-2" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{issue}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400 italic">No significant issues identified</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Trend */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Performance Trend</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Section Scores</span>
            <div className="flex items-center space-x-2">
              {sections.map((section, index) => (
                <div
                  key={index}
                  className={`w-8 h-8 rounded ${getScoreBg(section.score)} ${getScoreBorder(section.score)} border flex items-center justify-center`}
                >
                  <span className={`text-xs font-bold ${getScoreColor(section.score)}`}>
                    {section.score}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Trend Analysis:</strong> Your performance shows{' '}
              {sections[sections.length - 1].score > sections[0].score 
                ? 'improvement throughout the interview, ending stronger than you started.' 
                : sections[sections.length - 1].score < sections[0].score
                  ? 'some decline towards the end, possibly due to fatigue or difficult questions.'
                  : 'consistent performance across all sections.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionAnalysis;