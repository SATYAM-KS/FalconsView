import React from 'react';
import { EmotionData } from '../types/analysis';

interface EmotionTimelineProps {
  emotions: EmotionData[];
}

const EmotionTimeline: React.FC<EmotionTimelineProps> = ({ emotions }) => {
  const getEmotionColor = (emotion: string) => {
    const colors = {
      confident: 'bg-green-500',
      nervous: 'bg-red-500',
      enthusiastic: 'bg-blue-500',
      hesitant: 'bg-yellow-500',
      uncertain: 'bg-orange-500',
      professional: 'bg-purple-500',
    };
    return colors[emotion as keyof typeof colors] || 'bg-gray-500';
  };

  const getEmotionIcon = (emotion: string) => {
    const icons = {
      confident: '💪',
      nervous: '😰',
      enthusiastic: '🎉',
      hesitant: '🤔',
      uncertain: '😕',
      professional: '👔',
    };
    return icons[emotion as keyof typeof icons] || '😐';
  };

  const getIntensityHeight = (intensity: number) => {
    return Math.max(20, intensity * 60); // Minimum 20px, max 60px
  };

  const timeToSeconds = (timeStr: string) => {
    const [minutes, seconds] = timeStr.split(':').map(Number);
    return minutes * 60 + seconds;
  };

  // Calculate total duration from the last emotion timestamp + duration
  const totalDuration = emotions.length > 0 
    ? Math.max(...emotions.map(e => timeToSeconds(e.timestamp) + e.duration))
    : 512; // fallback to 8:32 in seconds

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Emotion Timeline</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Track emotional states and confidence levels throughout the interview
        </p>
      </div>

      {/* Timeline Visualization */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Emotional Journey</h3>
          
          {/* Timeline container */}
          <div className="relative">
            {/* Time markers */}
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
              <span>0:00</span>
              <span>2:00</span>
              <span>4:00</span>
              <span>6:00</span>
              <span>8:32</span>
            </div>
            
            {/* Timeline track */}
            <div className="relative h-20 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
              {emotions.map((emotion, index) => {
                const startSeconds = timeToSeconds(emotion.timestamp);
                const leftPercentage = (startSeconds / totalDuration) * 100;
                const widthPercentage = Math.max(2, (emotion.duration / totalDuration) * 100); // Minimum 2% width for visibility
                
                return (
                  <div
                    key={index}
                    className={`absolute top-0 ${getEmotionColor(emotion.emotion)} opacity-80 flex items-center justify-center transition-all duration-300 hover:opacity-100 cursor-pointer`}
                    style={{
                      left: `${leftPercentage}%`,
                      width: `${widthPercentage}%`,
                      height: `${getIntensityHeight(emotion.intensity)}px`,
                      marginTop: `${60 - getIntensityHeight(emotion.intensity)}px`,
                    }}
                    title={`${emotion.emotion} (${emotion.intensity * 100}% intensity) at ${emotion.timestamp}`}
                  >
                    <span className="text-white text-xs font-medium">
                      {getEmotionIcon(emotion.emotion)}
                    </span>
                  </div>
                );
              })}
              
              {/* Add connecting lines between emotions for better visualization */}
              {emotions.map((emotion, index) => {
                if (index === emotions.length - 1) return null;
                const currentEnd = timeToSeconds(emotion.timestamp) + emotion.duration;
                const nextStart = timeToSeconds(emotions[index + 1].timestamp);
                const gapStart = (currentEnd / totalDuration) * 100;
                const gapWidth = ((nextStart - currentEnd) / totalDuration) * 100;
                
                if (gapWidth > 1) { // Only show gap if it's significant
                  return (
                    <div
                      key={`gap-${index}`}
                      className="absolute top-0 bg-gray-300 dark:bg-gray-600 opacity-30"
                      style={{
                        left: `${gapStart}%`,
                        width: `${gapWidth}%`,
                        height: '20px',
                        marginTop: '40px',
                      }}
                    />
                  );
                }
                return null;
              })}
            </div>
            
            {/* Intensity scale */}
            <div className="absolute left-0 top-0 -ml-8 h-20 flex flex-col justify-between text-xs text-gray-400 dark:text-gray-500">
              <span>High</span>
              <span>Low</span>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Emotion Legend</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {['confident', 'nervous', 'enthusiastic', 'hesitant', 'uncertain', 'professional'].map((emotion) => (
              <div key={emotion} className="flex items-center space-x-2">
                <div className={`w-4 h-4 rounded ${getEmotionColor(emotion)}`} />
                <span className="text-sm text-gray-600 dark:text-gray-300 capitalize">{emotion}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Emotion Events */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Detailed Events</h3>
        <div className="space-y-3">
          {emotions.map((emotion, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex-shrink-0">
                <div className={`w-8 h-8 rounded-full ${getEmotionColor(emotion.emotion)} flex items-center justify-center`}>
                  <span className="text-white text-sm">
                    {getEmotionIcon(emotion.emotion)}
                  </span>
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900 dark:text-white capitalize">{emotion.emotion}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">at {emotion.timestamp}</span>
                </div>
                <div className="flex items-center space-x-4 mt-1">
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Intensity: {Math.round(emotion.intensity * 100)}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Duration: {emotion.duration}s
                  </div>
                </div>
              </div>
              
              <div className="flex-shrink-0">
                <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getEmotionColor(emotion.emotion)}`}
                    style={{ width: `${emotion.intensity * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-6">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-3">Key Insights</h3>
        <div className="space-y-2 text-blue-800 dark:text-blue-300">
          <p>• Most confident period: 6:30-7:30 with sustained high confidence</p>
          <p>• Initial nervousness (0:15-0:27) typical for interview starts</p>
          <p>• Strong enthusiasm shown during technical discussion (3:45-4:17)</p>
          <p>• Brief uncertainty at 5:12 may indicate challenging question</p>
        </div>
      </div>
    </div>
  );
};

export default EmotionTimeline;