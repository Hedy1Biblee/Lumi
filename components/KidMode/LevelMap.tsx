import React from 'react';
import { Lock, Star, Play, ArrowLeft } from 'lucide-react';
import { Level } from '../../types';
import Button from '../Button';

interface LevelMapProps {
  levels: Level[];
  onSelectLevel: (level: Level) => void;
  onBack: () => void;
}

const LevelMap: React.FC<LevelMapProps> = ({ levels, onSelectLevel, onBack }) => {
  // Constellation layout positions
  const positions = [
    { top: '60%', left: '20%' },
    { top: '30%', left: '50%' },
    { top: '55%', left: '80%' },
  ];

  return (
    <div className="relative h-full w-full overflow-hidden">
       <div className="absolute top-4 left-4 z-20">
        <Button variant="secondary" size="sm" onClick={onBack} icon={<ArrowLeft size={20} />}>
          Home
        </Button>
      </div>

      <h2 className="absolute top-8 w-full text-center text-3xl font-bold text-[#FDF5E6] z-10 tracking-widest drop-shadow-lg">
        MISSION MAP
      </h2>

      {/* SVG Connecting Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <path d="M20% 60% L 50% 30% L 80% 55%" stroke="#4B5563" strokeWidth="3" strokeDasharray="10 5" fill="none" className="opacity-50" />
      </svg>

      {/* Level Nodes */}
      {levels.map((level, index) => {
        const isLocked = level.status === 'locked';
        const pos = positions[index] || { top: '50%', left: '50%' };
        
        return (
          <button
            key={level.id}
            onClick={() => !isLocked && onSelectLevel(level)}
            disabled={isLocked}
            className={`
              absolute transform -translate-x-1/2 -translate-y-1/2
              w-24 h-24 md:w-32 md:h-32 rounded-full border-4 shadow-[0_0_30px_rgba(176,196,222,0.2)]
              flex flex-col items-center justify-center transition-all duration-300 z-10
              ${isLocked 
                ? 'bg-[#2E3244] border-[#4B5563] cursor-not-allowed opacity-70' 
                : 'bg-[#252836] border-[#B0C4DE] hover:scale-110 hover:shadow-[0_0_50px_rgba(176,196,222,0.6)] cursor-pointer'
              }
            `}
            style={{ top: pos.top, left: pos.left }}
          >
            {isLocked ? (
              <Lock className="text-[#4B5563]" size={32} />
            ) : (
              <>
                <div className="bg-[#B0C4DE] rounded-full p-2 mb-1">
                   {level.type === 'puzzle' ? <Star size={24} className="text-[#252836] fill-current" /> : <Play size={24} className="text-[#252836] fill-current" />}
                </div>
                <span className="text-xs md:text-sm font-bold text-[#FDF5E6] text-center px-1">{level.name}</span>
                <div className="flex mt-1">
                  {[...Array(3)].map((_, i) => (
                    <Star key={i} size={10} className={`${i < level.stars ? 'text-yellow-400 fill-current' : 'text-[#4B5563]'}`} />
                  ))}
                </div>
              </>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default LevelMap;
