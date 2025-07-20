import { OpenRouterAnalysisService, OpenRouterAnalysisResult } from './openRouterAnalysis';
import { AnalysisResult } from '../types/analysis';

export class AnalysisProcessor {
  private openRouterAnalyzer: OpenRouterAnalysisService | null = null;

  constructor() {
    // Initialize OpenRouter analyzer when API key is available
  }

  private initializeOpenRouter(): OpenRouterAnalysisService {
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    if (!apiKey) {
      throw new Error('OpenRouter API key not found. Please add VITE_OPENROUTER_API_KEY to your environment variables.');
    }
    
    if (!this.openRouterAnalyzer) {
      this.openRouterAnalyzer = new OpenRouterAnalysisService(apiKey);
    }
    
    return this.openRouterAnalyzer;
  }

  async processFile(file: File, onProgress?: (progress: number, stage: string) => void): Promise<AnalysisResult> {
    try {
      // Validate file
      if (!this.isValidAudioFile(file)) {
        throw new Error('Please upload a valid audio or video file (MP3, MP4, WAV, MOV, etc.)');
      }

      onProgress?.(5, 'Validating file...');
      
      // Initialize OpenRouter analyzer
      const openRouterAnalyzer = this.initializeOpenRouter();
      
      // Process with OpenRouter AI
      const analysisResult = await openRouterAnalyzer.analyzeInterview(file, (progress, stage) => {
        onProgress?.(progress, stage);
      });
      
      // Convert to our format
      const emotions = this.convertEmotions(analysisResult.emotions);
      const sections = this.generateSections(analysisResult.transcription.segments, analysisResult.speechMetrics, emotions);
      
      const result: AnalysisResult = {
        id: Date.now().toString(),
        fileName: file.name,
        duration: this.formatDuration(this.calculateDuration(analysisResult.transcription.segments)),
        timestamp: new Date(),
        overallScore: analysisResult.overallScore,
        metrics: analysisResult.performanceMetrics,
        emotions,
        patterns: {
          hesitationCount: analysisResult.speechMetrics.hesitationCount,
          averagePause: analysisResult.speechMetrics.averagePauseLength ?? 0,
          speechRate: analysisResult.speechMetrics.speechRate,
          fillerWords: analysisResult.speechMetrics.fillerWordCount,
          interruptionsHandled: Math.max(0, Math.floor(analysisResult.speechMetrics.pauseCount * 0.3))
        },
        feedback: analysisResult.feedback,
        sections
      };

      return result;
    } catch (error) {
      console.error('Analysis processing failed:', error);
      throw error;
    }
  }

  private isValidAudioFile(file: File): boolean {
    const validTypes = [
      'audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg', 'audio/aac', 'audio/m4a',
      'video/mp4', 'video/mpeg', 'video/quicktime', 'video/x-msvideo', 'video/webm'
    ];
    
    const validExtensions = [
      '.mp3', '.wav', '.ogg', '.aac', '.m4a', '.mp4', '.mpeg', '.mov', '.avi', '.webm'
    ];
    
    const hasValidType = validTypes.some(type => file.type.includes(type.split('/')[1]));
    const hasValidExtension = validExtensions.some(ext => 
      file.name.toLowerCase().endsWith(ext)
    );
    
    return hasValidType || hasValidExtension;
  }

  private convertEmotions(rawEmotions: Array<{timestamp: number; emotion: string; confidence: number; duration: number}>): Array<{
    timestamp: string;
    emotion: string;
    intensity: number;
    duration: number;
  }> {
    return rawEmotions.map(emotion => ({
      timestamp: this.formatTimestamp(emotion.timestamp),
      emotion: emotion.emotion,
      intensity: emotion.confidence,
      duration: Math.round(emotion.duration)
    }));
  }

  private calculateDuration(segments: Array<{start: number; end: number}>): number {
    if (segments.length === 0) return 0;
    return Math.max(...segments.map(s => s.end));
  }

  private generateSections(segments: any[], speechMetrics: any, emotions: any[]): Array<{
    title: string;
    timeRange: string;
    score: number;
    issues: string[];
    highlights: string[];
  }> {
    const duration = this.calculateDuration(segments);
    const sections = [];
    const sectionDuration = duration / 4;
    
    const sectionTitles = [
      'Opening & Introduction',
      'Technical Discussion',
      'Behavioral Questions',
      'Closing & Questions'
    ];

    for (let i = 0; i < 4; i++) {
      const startTime = i * sectionDuration;
      const endTime = (i + 1) * sectionDuration;
      
      // Get emotions for this section
      const sectionEmotions = emotions.filter(e => {
        const timestamp = this.parseTimestamp(e.timestamp);
        return timestamp >= startTime && timestamp < endTime;
      });
      
      // Calculate section score
      let score = 70; // Base score
      
      const confidentCount = sectionEmotions.filter(e => e.emotion === 'confident' || e.emotion === 'enthusiastic').length;
      const nervousCount = sectionEmotions.filter(e => e.emotion === 'nervous' || e.emotion === 'hesitant').length;
      
      score += confidentCount * 6 - nervousCount * 10;
      
      // Adjust based on section-specific factors
      if (i === 0) { // Opening
        if (nervousCount === 0) score += 10; // Good start
        if (confidentCount > 0) score += 5;
      } else if (i === 1) { // Technical
        if (confidentCount > 0) score += 15; // Confidence in technical section is valuable
      } else if (i === 3) { // Closing
        if (confidentCount > 0) score += 8; // Strong finish
      }
      
      score = Math.max(35, Math.min(100, score));
      
      // Generate issues and highlights
      const issues: string[] = [];
      const highlights: string[] = [];
      
      if (nervousCount > sectionEmotions.length * 0.5) {
        issues.push('Noticeable nervousness in this section');
      }
      
      if (sectionEmotions.length === 0) {
        issues.push('Limited vocal engagement detected');
      }
      
      if (confidentCount > sectionEmotions.length * 0.6) {
        highlights.push('Strong confidence demonstrated');
      }
      
      if (i === 0 && score > 75) {
        highlights.push('Good opening impression and introduction');
      }
      
      if (i === 1 && score > 80) {
        highlights.push('Excellent technical knowledge and communication');
      }
      
      if (i === 2 && score > 75) {
        highlights.push('Effective storytelling and behavioral responses');
      }
      
      if (i === 3 && score > 80) {
        highlights.push('Strong closing with thoughtful questions');
      }

      sections.push({
        title: sectionTitles[i],
        timeRange: `${this.formatTimestamp(startTime)} - ${this.formatTimestamp(endTime)}`,
        score: Math.round(score),
        issues,
        highlights
      });
    }

    return sections;
  }

  private formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  private formatTimestamp(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  private parseTimestamp(timestamp: string): number {
    const [minutes, seconds] = timestamp.split(':').map(Number);
    return minutes * 60 + seconds;
  }
}