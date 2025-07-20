import React, { useState, useEffect } from 'react';
import { Brain, Mic, Eye, MessageSquare, CheckCircle } from 'lucide-react';

interface AnalysisDashboardProps {
  progress: number;
  stage: string;
}

const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({ progress, stage }) => {
  const [currentStage, setCurrentStage] = useState(0);

  const stages = [
    {
      icon: <Mic className="w-6 h-6" />,
      title: 'Audio Processing',
      description: 'Extracting speech patterns and analyzing audio quality',
      duration: 800
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'AI Emotion Detection',
      description: 'Identifying emotional states and confidence levels',
      duration: 1000
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'Speech Analysis',
      description: 'Detecting hesitation patterns and communication flow',
      duration: 700
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'Performance Evaluation',
      description: 'Generating insights and improvement recommendations',
      duration: 500
    }
  ];

  useEffect(() => {
    // Update current stage based on progress
    if (progress <= 25) setCurrentStage(0);
    else if (progress <= 55) setCurrentStage(1);
    else if (progress <= 85) setCurrentStage(2);
    else setCurrentStage(3);
  }, [progress]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6 transition-colors duration-300">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full mx-auto mb-6 flex items-center justify-center animate-pulse">
            <Brain className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in-up">
            Analyzing Your Interview
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            Our AI is processing your interview to provide detailed insights
          </p>
        </div>

        {/* Progress Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 mb-8 animate-fade-in-up transition-colors duration-300" style={{ animationDelay: '400ms' }}>
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Analysis Progress</span>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 h-3 rounded-full transition-all duration-300 ease-out animate-pulse"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Stages */}
          <div className="space-y-4">
            {stages.map((stage, index) => (
              <div 
                key={index}
                className={`
                  flex items-center p-4 rounded-lg transition-all duration-300
                  ${index === currentStage 
                    ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 transform scale-105' 
                    : index < currentStage 
                      ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                      : 'bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600'
                  }
                `}
              >
                <div className={`
                  flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${index === currentStage ? 'animate-pulse' : ''}
                  ${index === currentStage 
                    ? 'bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-400' 
                    : index < currentStage 
                      ? 'bg-green-100 dark:bg-green-800 text-green-600 dark:text-green-400' 
                      : 'bg-gray-100 dark:bg-gray-600 text-gray-400 dark:text-gray-500'
                  }
                `}>
                  {index < currentStage ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    stage.icon
                  )}
                </div>
                
                <div className="ml-4 flex-1">
                  <h3 className={`
                    font-semibold transition-colors duration-300
                    ${index === currentStage 
                      ? 'text-blue-900 dark:text-blue-300' 
                      : index < currentStage 
                        ? 'text-green-900 dark:text-green-300' 
                        : 'text-gray-600 dark:text-gray-400'
                    }
                  `}>
                    {stage.title}
                  </h3>
                  <p className={`
                    text-sm transition-colors duration-300
                    ${index === currentStage 
                      ? 'text-blue-700 dark:text-blue-400' 
                      : index < currentStage 
                        ? 'text-green-700 dark:text-green-400' 
                        : 'text-gray-500 dark:text-gray-500'
                    }
                  `}>
                    {stage.description}
                  </p>
                </div>

                {index === currentStage && (
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full animate-ping" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Status Updates */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full animate-ping" />
            <p className="text-blue-800 dark:text-blue-300 font-medium">
              {stage || (currentStage < stages.length 
                ? `Currently: ${stages[currentStage].description}` 
                : 'Finalizing analysis results...')
              }
            </p>
          </div>
          <p className="text-blue-600 dark:text-blue-400 text-sm mt-2">
            Analysis time varies based on file size and complexity
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalysisDashboard;