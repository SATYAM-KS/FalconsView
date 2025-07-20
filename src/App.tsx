import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import HomePage from './components/HomePage';
import UploadInterface from './components/UploadInterface';
import AnalysisDashboard from './components/AnalysisDashboard';
import ResultsDisplay from './components/ResultsDisplay';
import { AnalysisResult } from './types/analysis';
import { AnalysisProcessor } from './services/analysisProcessor';

function App() {
  const [currentStep, setCurrentStep] = useState<'home' | 'upload' | 'analyzing' | 'results'>('home');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStage, setAnalysisStage] = useState('');

  const handleStartAnalysis = () => {
    setCurrentStep('upload');
  };

  const handleFileUpload = async (file: File) => {
    setCurrentStep('analyzing');
    setAnalysisProgress(0);
    setAnalysisStage('Initializing analysis...');
    
    try {
      const processor = new AnalysisProcessor();
      const result = await processor.processFile(file, (progress, stage) => {
        setAnalysisProgress(progress);
        setAnalysisStage(stage);
      });
      
      setAnalysisResult(result);
      setCurrentStep('results');
    } catch (error) {
      console.error('Analysis failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Analysis failed. Please try again with a different file.';
      alert(errorMessage);
      setCurrentStep('upload');
    }
  };

  const handleBackToUpload = () => {
    setCurrentStep('upload');
    setAnalysisResult(null);
  };

  const handleBackToHome = () => {
    setCurrentStep('home');
    setAnalysisResult(null);
  };
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        {currentStep === 'home' && (
          <HomePage onStartAnalysis={handleStartAnalysis} />
        )}
        
        {currentStep === 'upload' && (
          <UploadInterface onFileUpload={handleFileUpload} onBackToHome={handleBackToHome} />
        )}
        
        {currentStep === 'analyzing' && (
          <AnalysisDashboard progress={analysisProgress} stage={analysisStage} />
        )}
        
        {currentStep === 'results' && analysisResult && (
          <ResultsDisplay 
            result={analysisResult} 
            onBackToUpload={handleBackToUpload}
            onBackToHome={handleBackToHome}
          />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;