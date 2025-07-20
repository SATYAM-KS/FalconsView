import React, { useState } from 'react';
import { AnalysisResult } from '../types/analysis';
import OverviewMetrics from './OverviewMetrics';
import EmotionTimeline from './EmotionTimeline';
import FeedbackSection from './FeedbackSection';
import SectionAnalysis from './SectionAnalysis';
import { Download, ArrowLeft, BarChart3, Baseline as Timeline, MessageCircle, FileText } from 'lucide-react';

interface ResultsDisplayProps {
  result: AnalysisResult;
  onBackToUpload: () => void;
  onBackToHome: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, onBackToUpload, onBackToHome }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'feedback' | 'sections'>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'timeline', label: 'Timeline', icon: <Timeline className="w-4 h-4" /> },
    { id: 'feedback', label: 'Feedback', icon: <MessageCircle className="w-4 h-4" /> },
    { id: 'sections', label: 'Sections', icon: <FileText className="w-4 h-4" /> },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-50 border-green-200';
    if (score >= 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const handleDownloadReport = () => {
    const reportData = {
      ...result,
      generatedAt: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: 'application/json',
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `interview-analysis-${result.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={onBackToHome}
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-all duration-300 transform hover:scale-105"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Home</span>
                </button>
                <span className="text-gray-300 dark:text-gray-600">|</span>
                <button
                  onClick={onBackToUpload}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-all duration-300 transform hover:scale-105"
                >
                  New Analysis
                </button>
              </div>
              
              <div className="border-l border-gray-300 dark:border-gray-600 pl-4">
                <button 
                  onClick={onBackToHome}
                  className="hover:opacity-80 transition-opacity duration-200"
                >
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white animate-fade-in-up">{result.fileName}</h1>
                </button>
                <p className="text-sm text-gray-500 dark:text-gray-400 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                  Analyzed on {result.timestamp.toLocaleDateString()} • Duration: {result.duration}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className={`px-4 py-2 rounded-lg border ${getScoreBg(result.overallScore)}`}>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Overall Score:</span>
                <span className={`ml-2 text-lg font-bold ${getScoreColor(result.overallScore)}`}>
                  {result.overallScore}/100
                </span>
              </div>
              
              <button
                onClick={handleDownloadReport}
                className="flex items-center space-x-2 bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span>Download Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`
                  flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-all duration-300 transform hover:scale-105
                  ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                  }
                `}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'overview' && <OverviewMetrics result={result} />}
        {activeTab === 'timeline' && <EmotionTimeline emotions={result.emotions} />}
        {activeTab === 'feedback' && <FeedbackSection feedback={result.feedback} patterns={result.patterns} />}
        {activeTab === 'sections' && <SectionAnalysis sections={result.sections} />}
      </div>
    </div>
  );
};

export default ResultsDisplay;