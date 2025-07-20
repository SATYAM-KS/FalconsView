# AI Interview Analysis Platform

A sophisticated interview analysis platform powered by OpenRouter AI that provides real-time transcription, emotion detection, and comprehensive performance feedback.

## Features

- **Real AI Transcription**: Powered by OpenRouter AI for accurate speech-to-text conversion
- **Emotion Detection**: Advanced analysis of emotional states and confidence levels throughout the interview
- **Speech Pattern Analysis**: Detection of hesitation, filler words, speech rate, and communication flow
- **Performance Metrics**: Comprehensive scoring for confidence, clarity, engagement, and professionalism
- **Detailed Feedback**: Personalized recommendations and improvement strategies
- **Section Analysis**: Breakdown of performance across different interview segments
- **Interactive Dashboard**: Beautiful, responsive interface with dark mode support

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure OpenRouter API

1. Get your OpenRouter API key from [OpenRouter](https://openrouter.ai/keys)
2. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Add your API key to `.env`:
   ```
   VITE_OPENROUTER_API_KEY=your_actual_api_key_here
   ```

### 3. Start Development Server

```bash
npm run dev
```

## How It Works

1. **Upload**: Upload your interview recording (MP3, MP4, WAV, MOV, etc.)
2. **AI Analysis**: OpenRouter AI transcribes and analyzes your speech patterns
3. **Results**: Get detailed insights with actionable feedback

## Supported File Formats

- Audio: MP3, WAV, OGG, AAC, M4A
- Video: MP4, MOV, AVI, WebM

## Technology Stack

- **Frontend**: React + TypeScript + Tailwind CSS
- **AI Engine**: OpenRouter AI
- **Build Tool**: Vite
- **Icons**: Lucide React

## API Requirements

This application requires a valid OpenRouter API key. The API is used for:
- Audio transcription
- Speech pattern analysis
- Emotion detection
- Performance evaluation

## Privacy & Security

- All processing is done through OpenRouter's API
- No audio files are stored permanently
- Analysis results are generated in real-time
- No personal data is retained after the session

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details