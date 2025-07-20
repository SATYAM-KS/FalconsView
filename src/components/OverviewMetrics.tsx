import React from 'react';
import { AnalysisResult } from '../types/analysis';
import { TrendingUp, Users, MessageSquare, Clock, Pause, Volume2 } from 'lucide-react';

interface OverviewMetricsProps {
  result: AnalysisResult;
}

const OverviewMetrics: React.FC<OverviewMetricsProps> = ({ result }) => {
  const MetricCard = ({ 
    title, 
    value, 
    icon, 
    color, 
    suffix = '', 
    description 
  }: {
    title: string;
    value: number;
    icon: React.ReactNode;
    color: string;
    suffix?: string;
    description: string;
  }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          {icon}
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">
            {value}{suffix}
          </div>
          <div className="text-sm text-gray-500">{title}</div>
        </div>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
      
      {/* Progress bar */}
      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${
              value >= 80 ? 'bg-green-500' : 
              value >= 60 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${value}%` }}
          />
        </div>
      </div>
    </div>
  );

  const PatternCard = ({ 
    title, 
    value, 
    icon, 
    unit, 
    benchmark, 
    status 
  }: {
    title: string;
    value: number;
    icon: React.ReactNode;
    unit: string;
    benchmark: string;
    status: 'good' | 'warning' | 'poor';
  }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className={`p-2 rounded-lg ${
          status === 'good' ? 'bg-green-100 text-green-600' :
          status === 'warning' ? 'bg-yellow-100 text-yellow-600' :
          'bg-red-100 text-red-600'
        }`}>
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{benchmark}</p>
        </div>
      </div>
      
      <div className="text-3xl font-bold text-gray-900 mb-2">
        {value}{unit}
      </div>
      
      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
        status === 'good' ? 'bg-green-100 text-green-800' :
        status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
        'bg-red-100 text-red-800'
      }`}>
        {status === 'good' ? 'Excellent' : status === 'warning' ? 'Needs Work' : 'Requires Attention'}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Performance Metrics */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Performance Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Confidence"
            value={result.metrics.confidence}
            icon={<TrendingUp className="w-5 h-5 text-blue-600" />}
            color="bg-blue-100 dark:bg-blue-900"
            suffix="%"
            description="Overall confidence level throughout the interview"
          />
          
          <MetricCard
            title="Clarity"
            value={result.metrics.clarity}
            icon={<Volume2 className="w-5 h-5 text-green-600" />}
            color="bg-green-100 dark:bg-green-900"
            suffix="%"
            description="Speech clarity and articulation quality"
          />
          
          <MetricCard
            title="Engagement"
            value={result.metrics.engagement}
            icon={<Users className="w-5 h-5 text-purple-600" />}
            color="bg-purple-100 dark:bg-purple-900"
            suffix="%"
            description="Level of engagement and enthusiasm shown"
          />
          
          <MetricCard
            title="Professionalism"
            value={result.metrics.professionalism}
            icon={<MessageSquare className="w-5 h-5 text-orange-600" />}
            color="bg-orange-100 dark:bg-orange-900"
            suffix="%"
            description="Professional communication and demeanor"
          />
        </div>
      </div>

      {/* Speech Patterns */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Speech Pattern Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PatternCard
            title="Speech Rate"
            value={result.patterns.speechRate}
            icon={<Clock className="w-5 h-5" />}
            unit=" WPM"
            benchmark="Optimal: 140-160 WPM"
            status={result.patterns.speechRate >= 140 && result.patterns.speechRate <= 160 ? 'good' : 'warning'}
          />
          
          <PatternCard
            title="Hesitations"
            value={result.patterns.hesitationCount}
            icon={<Pause className="w-5 h-5" />}
            unit=""
            benchmark="Target: < 10 instances"
            status={result.patterns.hesitationCount < 10 ? 'good' : result.patterns.hesitationCount < 20 ? 'warning' : 'poor'}
          />
          
          <PatternCard
            title="Filler Words"
            value={result.patterns.fillerWords}
            icon={<MessageSquare className="w-5 h-5" />}
            unit=""
            benchmark="Target: < 15 instances"
            status={result.patterns.fillerWords < 15 ? 'good' : result.patterns.fillerWords < 25 ? 'warning' : 'poor'}
          />
        </div>
      </div>

      {/* Emotion Distribution */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Emotion Distribution</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {['confident', 'nervous', 'enthusiastic', 'hesitant', 'uncertain', 'professional'].map((emotion) => {
              const emotionData = result.emotions.filter(e => e.emotion === emotion);
              const totalDuration = emotionData.reduce((sum, e) => sum + e.duration, 0);
              const percentage = Math.round((totalDuration / 512) * 100); // 512 seconds = 8:32 duration
              
              return (
                <div key={emotion} className="text-center">
                  <div className="text-2xl mb-2">
                    {emotion === 'confident' && '💪'}
                    {emotion === 'nervous' && '😰'}
                    {emotion === 'enthusiastic' && '🎉'}
                    {emotion === 'hesitant' && '🤔'}
                    {emotion === 'uncertain' && '😕'}
                    {emotion === 'professional' && '👔'}
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{percentage}%</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">{emotion}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Statistics</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {result.patterns.averagePause.toFixed(1)}s
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Average Pause</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {result.patterns.interruptionsHandled}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Interruptions Handled</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {result.emotions.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Emotion Changes</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {result.sections.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Interview Sections</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewMetrics;