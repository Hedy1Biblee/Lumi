import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { ArrowLeft, Activity, Brain } from 'lucide-react';
import Button from '../Button';
import { UserStats, Emotion } from '../../types';
import { COLORS } from '../../constants';

interface DashboardProps {
  stats: UserStats;
  onBack: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ stats, onBack }) => {

  // Transform UserStats into Recharts format
  // We calculate proficiency score (0-100) based on correct/attempts
  const calculateScore = (e: Emotion) => {
    const s = stats[e];
    if (s.attempts === 0) return 0;
    return Math.round((s.correct / s.attempts) * 100);
  };

  const data = [
    { subject: 'Happy', A: calculateScore(Emotion.HAPPY), fullMark: 100 },
    { subject: 'Sad', A: calculateScore(Emotion.SAD), fullMark: 100 },
    { subject: 'Angry', A: calculateScore(Emotion.ANGRY), fullMark: 100 },
    { subject: 'Surprised', A: calculateScore(Emotion.SURPRISED), fullMark: 100 },
  ];

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto w-full">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack} size="sm" icon={<ArrowLeft size={20} />}>
                Home
            </Button>
            <h1 className="text-3xl font-bold text-[#B0C4DE]">Parent's Lighthouse</h1>
        </div>
        <div className="bg-[#2E3244] px-4 py-2 rounded-xl text-[#FDF5E6]">
            Total Stars Collected: <span className="text-yellow-400 font-bold text-xl ml-2">{stats.totalStars} ★</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Radar Chart Section */}
        <div className="bg-[#2E3244] p-6 rounded-3xl shadow-lg">
            <div className="flex items-center gap-2 mb-6">
                <Activity className="text-[#B0C4DE]" />
                <h2 className="text-xl font-bold text-[#FDF5E6]">Real-time Proficiency</h2>
            </div>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                        <PolarGrid stroke="#4B5563" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar
                            name="Child"
                            dataKey="A"
                            stroke={COLORS.primary}
                            strokeWidth={3}
                            fill={COLORS.primary}
                            fillOpacity={0.4}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
            <p className="text-sm text-[#9CA3AF] mt-4 text-center">
                Scores represent percentage of correct answers per emotion.
            </p>
        </div>

        {/* Stats Table Section (Simplified Matrix) */}
        <div className="bg-[#2E3244] p-6 rounded-3xl shadow-lg">
            <div className="flex items-center gap-2 mb-6">
                <Brain className="text-[#B0C4DE]" />
                <h2 className="text-xl font-bold text-[#FDF5E6]">Detailed Stats</h2>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-center">
                    <thead>
                        <tr className="border-b border-[#4B5563]">
                            <th className="p-3 text-[#9CA3AF] text-left">Emotion</th>
                            <th className="p-3 text-[#FDF5E6]">Attempts</th>
                            <th className="p-3 text-[#FDF5E6]">Correct</th>
                            <th className="p-3 text-[#FDF5E6]">Accuracy</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(Emotion).map((emotion) => {
                            const s = stats[emotion];
                            const accuracy = s.attempts > 0 ? Math.round((s.correct / s.attempts) * 100) : 0;
                            return (
                                <tr key={emotion} className="border-b border-[#4B5563]/50">
                                    <td className="p-3 text-[#FDF5E6] font-bold text-left">{emotion}</td>
                                    <td className="p-3 text-[#9CA3AF]">{s.attempts}</td>
                                    <td className="p-3 text-[#9CAF88]">{s.correct}</td>
                                    <td className="p-3">
                                        <div className={`px-2 py-1 rounded-lg ${accuracy >= 80 ? 'bg-[#9CAF88]/20 text-[#9CAF88]' : accuracy >= 50 ? 'bg-[#F0E68C]/20 text-[#F0E68C]' : 'bg-[#E29578]/20 text-[#E29578]'}`}>
                                            {s.attempts === 0 ? '-' : `${accuracy}%`}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
             <p className="text-sm text-[#9CA3AF] mt-4">
                Monitor accuracy to identify which emotions need more practice.
            </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
