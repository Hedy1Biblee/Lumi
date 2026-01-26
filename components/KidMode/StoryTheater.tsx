import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Button from '../Button';
import { Scenario, Emotion } from '../../types';

interface StoryTheaterProps {
  scenario: Scenario;
  onComplete: (success: boolean) => void;
  onBack: () => void;
}

const StoryTheater: React.FC<StoryTheaterProps> = ({ scenario, onComplete, onBack }) => {
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [isWrong, setIsWrong] = useState(false);

  // Options to display (include correct one + distractors)
  const options = [Emotion.HAPPY, Emotion.SAD, Emotion.ANGRY, Emotion.SURPRISED];

  const handleSelect = (emotion: Emotion) => {
    setSelectedEmotion(emotion);
    if (emotion === scenario.correctEmotion) {
      onComplete(true);
    } else {
      setIsWrong(true);
      setTimeout(() => {
          setIsWrong(false);
          setSelectedEmotion(null);
      }, 1000);
      onComplete(false); // Log the mistake but don't finish game
    }
  };

  const getEmoji = (e: Emotion) => {
    switch(e) {
      case Emotion.HAPPY: return '😄';
      case Emotion.SAD: return '😢';
      case Emotion.ANGRY: return '😠';
      case Emotion.SURPRISED: return '😲';
      default: return '😐';
    }
  };

  return (
    <div className="flex flex-col h-full relative p-4">
      <div className="absolute top-4 left-4 z-20">
        <Button variant="secondary" size="sm" onClick={onBack} icon={<ArrowLeft size={20} />}>
          Map
        </Button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full">
        {/* Scenario Stage */}
        <div className="bg-[#2E3244] w-full p-8 rounded-3xl shadow-xl mb-12 text-center border-2 border-[#B0C4DE] relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-[#B0C4DE]"></div>
             <div className="text-6xl mb-6 animate-bounce">{scenario.icon}</div>
             <h2 className="text-2xl md:text-4xl font-bold text-[#FDF5E6] leading-tight">
               "{scenario.text}"
             </h2>
             <p className="mt-4 text-[#9CA3AF] text-lg">How do you feel?</p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-4 w-full">
            {options.map((emotion) => (
                <button
                    key={emotion}
                    onClick={() => handleSelect(emotion)}
                    className={`
                        p-6 rounded-2xl flex flex-col items-center justify-center gap-2
                        transition-all duration-200 transform hover:scale-105
                        border-2
                        ${selectedEmotion === emotion 
                            ? (isWrong ? 'bg-[#E29578] border-[#E29578] animate-shake' : 'bg-[#9CAF88] border-[#9CAF88]') 
                            : 'bg-[#252836] border-[#4B5563] hover:border-[#B0C4DE]'
                        }
                    `}
                >
                    <span className="text-5xl">{getEmoji(emotion)}</span>
                    <span className="text-[#FDF5E6] font-bold text-lg">{emotion}</span>
                </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default StoryTheater;
