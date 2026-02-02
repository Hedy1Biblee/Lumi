import React, { useState } from 'react';
import { Rocket, Anchor, Globe } from 'lucide-react';
import { AppView, Level, Emotion, UserStats, MoodLog, Scenario, Language } from './types';
import { INITIAL_LEVELS, SCENARIOS } from './constants';
import { TRANSLATIONS } from './translations';
import StarBackground from './components/StarBackground';
import LevelMap from './components/KidMode/LevelMap';
import EmotionPuzzle from './components/KidMode/EmotionPuzzle';
import MagicMirror from './components/KidMode/MagicMirror';
import StoryTheater from './components/KidMode/StoryTheater';
import Dashboard from './components/ParentMode/Dashboard';
import TrainingLog from './components/ParentMode/TrainingLog';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LANDING);
  const [language, setLanguage] = useState<Language>('en');
  const [levels, setLevels] = useState<Level[]>(INITIAL_LEVELS);
  
  // Game State
  const [activeLevelId, setActiveLevelId] = useState<string | null>(null);
  const [currentEmotion, setCurrentEmotion] = useState<Emotion>(Emotion.HAPPY);
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);

  // Global User Stats (Starts Empty)
  const [userStats, setUserStats] = useState<UserStats>({
    [Emotion.HAPPY]: { attempts: 0, correct: 0 },
    [Emotion.ANGRY]: { attempts: 0, correct: 0 },
    [Emotion.SAD]: { attempts: 0, correct: 0 },
    [Emotion.SURPRISED]: { attempts: 0, correct: 0 },
    totalStars: 0,
  });

  const [moodLogs, setMoodLogs] = useState<MoodLog[]>([]);

  // Translations helper
  const t = TRANSLATIONS[language];

  // Randomizer Helpers
  const getRandomEmotion = () => {
    const emotions = Object.values(Emotion);
    return emotions[Math.floor(Math.random() * emotions.length)];
  };

  const getRandomScenario = () => {
    return SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)];
  };

  // Logic to enter a level
  const handleLevelSelect = (level: Level) => {
    setActiveLevelId(level.id);
    
    // Randomize Content based on level type
    if (level.type === 'puzzle') {
      setCurrentEmotion(getRandomEmotion());
      setCurrentView(AppView.KID_PUZZLE);
    } else if (level.type === 'mirror') {
      setCurrentEmotion(getRandomEmotion());
      setCurrentView(AppView.KID_MIRROR);
    } else if (level.type === 'story') {
      setCurrentScenario(getRandomScenario());
      setCurrentView(AppView.KID_STORY);
    }
  };

  // Logic when a game is completed
  const handleGameComplete = (success: boolean) => {
    const emotionPlayed = currentView === AppView.KID_STORY && currentScenario 
      ? currentScenario.correctEmotion 
      : currentEmotion;

    // Update Global Stats
    setUserStats(prev => {
        const currentEmotionStats = prev[emotionPlayed];
        return {
            ...prev,
            totalStars: success ? prev.totalStars + 1 : prev.totalStars,
            [emotionPlayed]: {
                attempts: currentEmotionStats.attempts + 1,
                correct: success ? currentEmotionStats.correct + 1 : currentEmotionStats.correct
            }
        };
    });

    if (activeLevelId && success) {
      setLevels(prev => prev.map(l => l.id === activeLevelId ? { ...l, stars: Math.min(l.stars + 1, 3) } : l));
    }

    setCurrentView(AppView.KID_DASHBOARD);
  };

  const handleSaveMood = (log: MoodLog) => {
    setMoodLogs(prev => [log, ...prev]);
  };

  const toggleLanguage = () => {
      setLanguage(prev => prev === 'en' ? 'cn' : 'en');
  };

  const renderContent = () => {
    switch (currentView) {
      case AppView.LANDING:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen relative z-10 px-4">
            
            {/* Language Toggle */}
            <button 
                onClick={toggleLanguage}
                className="absolute top-6 right-6 bg-[#2E3244] hover:bg-[#3A3F55] p-3 rounded-full flex items-center gap-2 text-[#B0C4DE] border border-[#4B5563] transition-colors"
            >
                <Globe size={20} />
                <span className="font-bold text-sm">{language === 'en' ? 'EN' : '中文'}</span>
            </button>

            <div className="mb-12 text-center animate-fade-in-up">
              <div className="inline-block p-4 rounded-full bg-[#B0C4DE]/10 mb-4 backdrop-blur-sm">
                 <Rocket size={64} className="text-[#B0C4DE]" />
              </div>
              <h1 className="text-6xl font-bold text-[#FDF5E6] tracking-tighter drop-shadow-lg mb-2">{t.landing.title}</h1>
              <p className="text-xl text-[#9CA3AF] font-medium">{t.landing.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
              <button 
                onClick={() => setCurrentView(AppView.KID_DASHBOARD)}
                className="group relative bg-[#2E3244] hover:bg-[#3A3F55] border-2 border-[#B0C4DE] p-8 rounded-3xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_40px_rgba(176,196,222,0.3)] text-left"
              >
                <div className="absolute top-4 right-4 bg-[#B0C4DE] p-2 rounded-full">
                  <Rocket className="text-[#252836]" size={24} />
                </div>
                <h2 className="text-3xl font-bold text-[#FDF5E6] mb-2">{t.landing.kidTitle}</h2>
                <p className="text-[#9CA3AF]">{t.landing.kidDesc}</p>
              </button>

              <button 
                onClick={() => setCurrentView(AppView.PARENT_DASHBOARD)}
                className="group relative bg-[#2E3244] hover:bg-[#3A3F55] border-2 border-transparent hover:border-[#9CAF88] p-8 rounded-3xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-left"
              >
                 <div className="absolute top-4 right-4 bg-[#9CAF88] p-2 rounded-full">
                  <Anchor className="text-white" size={24} />
                </div>
                <h2 className="text-3xl font-bold text-[#FDF5E6] mb-2">{t.landing.parentTitle}</h2>
                <p className="text-[#9CA3AF]">{t.landing.parentDesc}</p>
              </button>
            </div>
          </div>
        );

      case AppView.KID_DASHBOARD:
        return (
          <LevelMap 
            levels={levels} 
            lang={language}
            onSelectLevel={handleLevelSelect} 
            onBack={() => setCurrentView(AppView.LANDING)} 
          />
        );

      case AppView.KID_PUZZLE:
        return (
          <EmotionPuzzle 
            targetEmotion={currentEmotion}
            lang={language}
            onComplete={handleGameComplete} 
            onBack={() => setCurrentView(AppView.KID_DASHBOARD)} 
          />
        );

      case AppView.KID_MIRROR:
        return (
          <MagicMirror 
            targetEmotion={currentEmotion}
            lang={language}
            onComplete={handleGameComplete} 
            onBack={() => setCurrentView(AppView.KID_DASHBOARD)} 
          />
        );
        
      case AppView.KID_STORY:
        if (!currentScenario) return null;
        return (
            <StoryTheater 
                scenario={currentScenario}
                lang={language}
                onComplete={handleGameComplete}
                onBack={() => setCurrentView(AppView.KID_DASHBOARD)}
            />
        );

      case AppView.PARENT_DASHBOARD:
        return (
          <div className="min-h-screen pb-12 relative z-10 overflow-y-auto">
             <Dashboard stats={userStats} lang={language} onBack={() => setCurrentView(AppView.LANDING)} />
             <TrainingLog logs={moodLogs} lang={language} onSaveLog={handleSaveMood} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-[#252836] text-[#FDF5E6] selection:bg-[#B0C4DE] selection:text-[#252836]">
      <StarBackground />
      {renderContent()}
    </div>
  );
};

export default App;
