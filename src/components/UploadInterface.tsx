import React, { useState, useRef } from 'react';
import { Upload, FileAudio, FileVideo, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';

interface UploadInterfaceProps {
  onFileUpload: (file: File) => void;
  onBackToHome: () => void;
}

const UploadInterface: React.FC<UploadInterfaceProps> = ({ onFileUpload, onBackToHome }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileSelection(files[0]);
    }
  };

  const handleFileSelection = (file: File) => {
    const validTypes = [
      'audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg', 'audio/aac', 'audio/m4a',
      'video/mp4', 'video/mpeg', 'video/quicktime', 'video/x-msvideo', 'video/webm'
    ];
    
    const validExtensions = [
      '.mp3', '.wav', '.ogg', '.aac', '.m4a', '.mp4', '.mpeg', '.mov', '.avi', '.webm'
    ];
    
    const hasValidType = validTypes.some(type => 
      file.type.includes(type.split('/')[1]) || file.type === type
    );
    const hasValidExtension = validExtensions.some(ext => 
      file.name.toLowerCase().endsWith(ext)
    );
    
    const isValidType = hasValidType || hasValidExtension;
    
    if (isValidType) {
      setSelectedFile(file);
    } else {
      alert('Please select a valid audio or video file (MP3, MP4, WAV, MOV, etc.).');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileSelection(files[0]);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('audio/')) return <FileAudio className="w-8 h-8 text-blue-500" />;
    if (fileType.startsWith('video/')) return <FileVideo className="w-8 h-8 text-purple-500" />;
    return <Upload className="w-8 h-8 text-gray-500" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6 transition-colors duration-300">
      <div className="max-w-2xl w-full">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={onBackToHome}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-all duration-300 transform hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in-up">
            AI Interview Analysis
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            Upload your interview recording to get detailed insights on performance patterns, 
            emotion detection, and personalized feedback for improvement.
          </p>
        </div>

        {/* Upload Area */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-fade-in-up transition-colors duration-300" style={{ animationDelay: '400ms' }}>
          <div className="p-8">
            <div
              className={`
                relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 transform hover:scale-105
                ${dragActive 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                  : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'
                }
              `}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*,video/*"
                onChange={handleInputChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center animate-bounce-slow">
                  <Upload className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                
                <div>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Drop your interview file here
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    or click to browse your files
                  </p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    Choose File
                  </button>
                </div>
                
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  Supports MP3, MP4, WAV, MOV files up to 500MB
                </p>
              </div>
            </div>

            {/* Selected File Display */}
            {selectedFile && (
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 animate-fade-in-up">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getFileIcon(selectedFile.type)}
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{selectedFile.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {formatFileSize(selectedFile.size)}
                      </p>
                    </div>
                  </div>
                  <CheckCircle className="w-6 h-6 text-green-500 dark:text-green-400 animate-pulse" />
                </div>
                
                <button
                  onClick={() => onFileUpload(selectedFile)}
                  className="w-full mt-4 bg-green-600 dark:bg-green-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 dark:hover:bg-green-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  Start Analysis
                </button>
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border-t border-blue-100 dark:border-blue-800 p-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div className="text-sm text-blue-800 dark:text-blue-300">
                <p className="font-medium mb-1">Powered by OpenRouter AI:</p>
                <ul className="space-y-1 text-blue-700 dark:text-blue-400">
                  <li>• Real AI transcription and speech analysis</li>
                  <li>• Advanced emotion and confidence detection</li>
                  <li>• Professional communication assessment</li>
                  <li>• Personalized feedback and improvement plans</li>
                </ul>
                <p className="text-xs text-blue-600 dark:text-blue-500 mt-2">
                  <strong>Note:</strong> Requires OpenRouter API key. See .env.example for setup instructions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg mx-auto mb-4 flex items-center justify-center animate-bounce-slow">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Precision Analysis</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Advanced AI algorithms detect subtle patterns in speech and behavior</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg mx-auto mb-4 flex items-center justify-center animate-bounce-slow" style={{ animationDelay: '200ms' }}>
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Detailed Reports</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Comprehensive feedback with actionable improvement recommendations</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg mx-auto mb-4 flex items-center justify-center animate-bounce-slow" style={{ animationDelay: '400ms' }}>
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Career Growth</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Build confidence and improve interview performance over time</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadInterface;