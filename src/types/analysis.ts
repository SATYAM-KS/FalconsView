export interface AnalysisResult {
  id: string;
  fileName: string;
  duration: string;
  timestamp: Date;
  overallScore: number;
  metrics: {
    confidence: number;
    clarity: number;
    engagement: number;
    professionalism: number;
  };
  emotions: Array<{
    timestamp: string;
    emotion: string;
    intensity: number;
    duration: number;
  }>;
  patterns: {
    hesitationCount: number;
    averagePause: number;
    speechRate: number;
    fillerWords: number;
    interruptionsHandled: number;
  };
  feedback: {
    strengths: string[];
    improvements: string[];
    suggestions: string[];
  };
  sections: Array<{
    title: string;
    timeRange: string;
    score: number;
    issues: string[];
    highlights: string[];
  }>;
}

export interface EmotionData {
  timestamp: string;
  emotion: string;
  intensity: number;
  duration: number;
}