import React from 'react';
import { Brain, BarChart3, Users, CheckCircle, ArrowRight, Play, Star, TrendingUp } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface HomePageProps {
  onStartAnalysis: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onStartAnalysis }) => {
  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'AI-Powered Analysis',
      description: 'Advanced AI models via OpenRouter provide real transcription and analyze speech patterns, emotions, and confidence levels.'
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Detailed Metrics',
      description: 'Comprehensive performance metrics including clarity, engagement, professionalism, and speech rate analysis.'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Personalized Feedback',
      description: 'Tailored recommendations and improvement strategies based on your unique communication patterns.'
    }
  ];

  const benefits = [
    'Identify emotional patterns and confidence fluctuations',
    'Detect hesitation points and speech flow issues',
    'Receive actionable feedback for improvement',
    'Track progress over multiple interview sessions',
    'Build confidence with data-driven insights',
    'Prepare effectively for real interviews'
  ];


  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => window.location.reload()}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">FalconsView</span>
            </button>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">How it Works</a>
              <ThemeToggle />
              <button
                onClick={onStartAnalysis}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-200"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Star className="w-4 h-4" />
                <span>Trusted by 10,000+ professionals</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
                Master Your
                <span className="text-blue-600 block">Interview Skills</span>
                with AI
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                Get detailed insights into your interview performance with OpenRouter AI. 
                Real transcription, emotion detection, and personalized feedback to help you 
                ace your next interview.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onStartAnalysis}
                  className="inline-flex items-center justify-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  <span>Analyze Your Interview</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                
                <button className="inline-flex items-center justify-center space-x-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
                  <Play className="w-5 h-5" />
                  <span>Watch Demo</span>
                </button>
              </div>
              
              <div className="flex items-center space-x-6 mt-8 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Free to try</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>No signup required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Instant results</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8 animate-fade-in-up">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Live Analysis Preview</h3>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Confidence Level</span>
                      <span className="text-sm font-medium text-green-600">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full w-[85%] transition-all duration-1000 animate-slide-in"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Speech Clarity</span>
                      <span className="text-sm font-medium text-blue-600">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full w-[92%] transition-all duration-1000 delay-300 animate-slide-in"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Engagement</span>
                      <span className="text-sm font-medium text-purple-600">78%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full w-[78%] transition-all duration-1000 delay-500 animate-slide-in"></div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                    <p className="text-sm text-blue-800 dark:text-blue-300">
                      <strong>Powered by OpenRouter AI:</strong> Real-time analysis of speech patterns, 
                      emotions, and professional communication skills.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center animate-float">
                <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center animate-float-delayed">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powered by OpenRouter AI
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Experience real AI-powered interview analysis with state-of-the-art language models 
              for accurate transcription and detailed performance insights.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-6">
                  <div className="text-blue-600 dark:text-blue-400">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Get professional interview feedback in just three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 animate-bounce-slow">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Upload Your Recording</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Upload your interview recording in any audio or video format. 
                Our platform supports all major file types.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 animate-bounce-slow" style={{ animationDelay: '200ms' }}>
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">AI Analysis</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our advanced AI analyzes your speech patterns, emotions, confidence levels, 
                and communication effectiveness.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 animate-bounce-slow" style={{ animationDelay: '400ms' }}>
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Get Detailed Feedback</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Receive comprehensive insights with actionable recommendations 
                to improve your interview performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Why Choose FalconsView?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Transform your interview skills with data-driven insights and personalized feedback 
                that helps you succeed in your career goals.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <button
                onClick={onStartAnalysis}
                className="mt-8 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Start Your Analysis
              </button>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8">
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">Confidence Boost</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Users report 40% increase in interview confidence after using our platform
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">Success Rate</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    85% of users receive job offers within 3 months of using our feedback
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                      <Brain className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">OpenRouter AI Powered</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Real AI transcription and analysis using advanced language models
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 dark:bg-blue-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white dark:text-gray-100 mb-6">
            Ready to Ace Your Next Interview?
          </h2>
          <p className="text-xl text-blue-100 dark:text-blue-200 mb-8">
            Get started with our AI-powered interview analysis and take your career to the next level.
          </p>
          
          <button
            onClick={onStartAnalysis}
            className="inline-flex items-center space-x-2 bg-white dark:bg-gray-100 text-blue-600 dark:text-blue-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 dark:hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            <span>Analyze Your Interview Now</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <p className="text-blue-200 dark:text-blue-300 text-sm mt-4">
            No credit card required • Get results in minutes
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold">FalconsView</span>
              </div>
              <p className="text-gray-400 dark:text-gray-500 text-sm">
                Empowering professionals with AI-driven interview insights and personalized feedback.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-400 dark:text-gray-500">
                <li><a href="#" className="hover:text-white dark:hover:text-gray-300 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white dark:hover:text-gray-300 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white dark:hover:text-gray-300 transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400 dark:text-gray-500">
                <li><a href="#" className="hover:text-white dark:hover:text-gray-300 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white dark:hover:text-gray-300 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white dark:hover:text-gray-300 transition-colors">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400 dark:text-gray-500">
                <li><a href="#" className="hover:text-white dark:hover:text-gray-300 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white dark:hover:text-gray-300 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white dark:hover:text-gray-300 transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 dark:border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400 dark:text-gray-500">
            <p>&copy; 2025 Falcons. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;