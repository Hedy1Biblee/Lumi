import React, { useState, useEffect } from 'react';
import { Star, ArrowLeft, RefreshCw, Check } from 'lucide-react';
import Button from '../Button';
import { COLORS } from '../../constants';
import { Emotion, Language } from '../../types';
import { TRANSLATIONS } from '../../translations';

interface EmotionPuzzleProps {
  targetEmotion: Emotion;
  lang: Language;
  onComplete: (success: boolean) => void;
  onBack: () => void;
}

type FeatureType = 'eyes' | 'mouth';

interface FeatureItem {
  id: string;
  type: FeatureType;
  emotion: Emotion;
  src: React.ReactNode;
}

const EmotionPuzzle: React.FC<EmotionPuzzleProps> = ({ targetEmotion, lang, onComplete, onBack }) => {
  const t = TRANSLATIONS[lang];
  const [selectedFeature, setSelectedFeature] = useState<FeatureItem | null>(null);
  const [placedEyes, setPlacedEyes] = useState<FeatureItem | null>(null);
  const [placedMouth, setPlacedMouth] = useState<FeatureItem | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [shake, setShake] = useState(false);

  // Dynamic SVG Features based on available emotions
  const features: FeatureItem[] = [
    // Eyes
    { id: 'e_happy', type: 'eyes', emotion: Emotion.HAPPY, src: <path d="M70 60 Q 85 50 100 60 M140 60 Q 155 50 170 60" stroke="#252836" strokeWidth="8" fill="none" strokeLinecap="round" /> },
    { id: 'e_angry', type: 'eyes', emotion: Emotion.ANGRY, src: <path d="M70 50 Q 85 70 100 60 M140 60 Q 155 70 170 50" stroke="#252836" strokeWidth="8" fill="none" strokeLinecap="round" /> },
    { id: 'e_sad', type: 'eyes', emotion: Emotion.SAD, src: <path d="M70 60 Q 85 50 100 60 M140 60 Q 155 50 170 60" stroke="#252836" strokeWidth="8" fill="none" strokeLinecap="round" transform="rotate(10, 85, 60) rotate(-10, 155, 60)" /> }, // Slanted slightly
    { id: 'e_surprised', type: 'eyes', emotion: Emotion.SURPRISED, src: <g><circle cx="85" cy="60" r="10" fill="#252836"/><circle cx="155" cy="60" r="10" fill="#252836"/><path d="M70 45 Q 85 35 100 45 M140 45 Q 155 35 170 45" stroke="#252836" strokeWidth="4" fill="none" /></g> },

    // Mouths
    { id: 'm_happy', type: 'mouth', emotion: Emotion.HAPPY, src: <path d="M80 140 Q 120 180 160 140" stroke="#252836" strokeWidth="8" fill="none" strokeLinecap="round" /> },
    { id: 'm_sad', type: 'mouth', emotion: Emotion.SAD, src: <path d="M80 160 Q 120 120 160 160" stroke="#252836" strokeWidth="8" fill="none" strokeLinecap="round" /> },
    { id: 'm_angry', type: 'mouth', emotion: Emotion.ANGRY, src: <path d="M80 150 L 120 140 L 160 150" stroke="#252836" strokeWidth="8" fill="none" strokeLinecap="round" /> },
    { id: 'm_surprised', type: 'mouth', emotion: Emotion.SURPRISED, src: <circle cx="120" cy="150" r="20" stroke="#252836" strokeWidth="8" fill="none" /> },
  ];

  const checkSuccess = () => {
    if (placedEyes?.emotion === targetEmotion && placedMouth?.emotion === targetEmotion) {
      setIsSuccess(true);
      setTimeout(() => onComplete(true), 2000);
    } else if (placedEyes && placedMouth) {
      // Wrong combination
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  useEffect(() => {
    if (placedEyes && placedMouth) {
      checkSuccess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placedEyes, placedMouth]);

  const handlePlaceFeature = (type: FeatureType) => {
    if (!selectedFeature) return;
    if (selectedFeature.type === type) {
      if (type === 'eyes') setPlacedEyes(selectedFeature);
      if (type === 'mouth') setPlacedMouth(selectedFeature);
      setSelectedFeature(null);
    }
  };

  return (
    <div className="flex flex-col h-full relative">
      <div className="absolute top-4 left-4 z-10">
        <Button variant="secondary" size="sm" onClick={onBack} icon={<ArrowLeft size={20} />}>
          {t.common.map}
        </Button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center py-8">
        <h2 className="text-3xl font-bold text-[#FDF5E6] mb-8 text-center">
          {t.puzzle.titlePrefix} <span className="text-[#B0C4DE]">{t.emotions[targetEmotion]}</span> {t.puzzle.titleSuffix}
        </h2>

        {/* The Face Canvas */}
        <div className={`relative w-64 h-64 md:w-80 md:h-80 bg-[#FDF5E6] rounded-full shadow-2xl transition-transform duration-300 ${shake ? 'translate-x-[-10px] translate-x-[10px]' : ''} ${isSuccess ? 'scale-110 drop-shadow-[0_0_25px_rgba(176,196,222,0.6)]' : ''}`}>
          <svg viewBox="0 0 240 240" className="w-full h-full">
            {/* Base Face Outline */}
            <circle cx="120" cy="120" r="110" stroke="#B0C4DE" strokeWidth="4" fill="none" />
            
            {/* Drop Zones */}
            <g 
              onClick={() => handlePlaceFeature('eyes')} 
              className={`cursor-pointer hover:opacity-80 transition-opacity ${!placedEyes && selectedFeature?.type === 'eyes' ? 'opacity-50 animate-pulse' : ''}`}
            >
              <rect x="60" y="40" width="120" height="60" fill="transparent" />
              {placedEyes ? placedEyes.src : <text x="120" y="80" textAnchor="middle" fill="#B0C4DE" fontSize="14">{t.puzzle.eyes}</text>}
            </g>

            <g 
              onClick={() => handlePlaceFeature('mouth')} 
              className={`cursor-pointer hover:opacity-80 transition-opacity ${!placedMouth && selectedFeature?.type === 'mouth' ? 'opacity-50 animate-pulse' : ''}`}
            >
              <rect x="70" y="120" width="100" height="80" fill="transparent" />
              {placedMouth ? placedMouth.src : <text x="120" y="160" textAnchor="middle" fill="#B0C4DE" fontSize="14">{t.puzzle.mouth}</text>}
            </g>
          </svg>

          {/* Success Overlay */}
          {isSuccess && (
            <div className="absolute inset-0 flex items-center justify-center animate-bounce">
              <Star size={100} fill={COLORS.success} stroke={COLORS.success} />
            </div>
          )}
        </div>

        {/* Feedback Message */}
        <div className="h-12 mt-6 flex items-center justify-center">
           {isSuccess ? (
             <div className="bg-[#9CAF88] px-6 py-2 rounded-xl flex items-center gap-2">
               <Check size={24} /> <span className="font-bold text-lg">{t.puzzle.success}</span>
             </div>
           ) : (
             <p className="text-[#9CA3AF]">{t.puzzle.instruction}</p>
           )}
        </div>
      </div>

      {/* Feature Palette */}
      <div className="bg-[#2E3244] p-6 rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.2)]">
        <div className="flex justify-between items-center max-w-2xl mx-auto gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {features.map((feature) => (
             <button
               key={feature.id}
               onClick={() => setSelectedFeature(feature)}
               className={`
                 flex-shrink-0 w-16 h-16 md:w-20 md:h-20 bg-[#FDF5E6] rounded-xl flex items-center justify-center
                 transition-all duration-200 border-4
                 ${selectedFeature?.id === feature.id ? 'border-[#B0C4DE] scale-110 shadow-lg' : 'border-transparent opacity-80 hover:opacity-100'}
               `}
               aria-label={`Select ${feature.emotion} ${feature.type}`}
             >
               <svg viewBox="0 0 240 240" className="w-12 h-12 md:w-16 md:h-16">
                 <g transform="translate(0, 0)">
                   {feature.src}
                 </g>
               </svg>
             </button>
          ))}
          <button 
            onClick={() => { setPlacedEyes(null); setPlacedMouth(null); setIsSuccess(false); }}
            className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 bg-[#252836] border-2 border-[#B0C4DE] rounded-xl flex flex-col items-center justify-center text-[#B0C4DE] hover:bg-[#3A3F55]"
          >
            <RefreshCw size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmotionPuzzle;
