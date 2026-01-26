import React, { useState } from 'react';
import { Calendar, Save, Clock } from 'lucide-react';
import Button from '../Button';
import { MoodLog } from '../../types';

interface TrainingLogProps {
  logs: MoodLog[];
  onSaveLog: (log: MoodLog) => void;
}

const TrainingLog: React.FC<TrainingLogProps> = ({ logs, onSaveLog }) => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [triggers, setTriggers] = useState<string[]>([]);

  const moodOptions = [
    { label: 'Calm', emoji: '😌', color: 'bg-[#9CAF88]' },
    { label: 'Hyper', emoji: '⚡', color: 'bg-[#F0E68C] text-[#252836]' },
    { label: 'Meltdown', emoji: '🌋', color: 'bg-[#E29578]' },
    { label: 'Tired', emoji: '😴', color: 'bg-[#B0C4DE] text-[#252836]' },
  ];

  const triggerOptions = ['Noise', 'Routine Change', 'Hunger', 'Screen Time', 'Social'];

  const toggleTrigger = (t: string) => {
    if (triggers.includes(t)) {
      setTriggers(triggers.filter(item => item !== t));
    } else {
      setTriggers([...triggers, t]);
    }
  };

  const handleSave = () => {
    if (!selectedMood) return;
    
    const newLog: MoodLog = {
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      mood: selectedMood,
      triggers: triggers,
    };
    
    onSaveLog(newLog);
    // Reset form
    setSelectedMood(null);
    setTriggers([]);
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto w-full pt-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Mood Tracker Form */}
        <div className="bg-[#2E3244] p-6 rounded-3xl shadow-lg">
            <h2 className="text-xl font-bold text-[#FDF5E6] mb-4">Today's Mood Check-in</h2>
            
            <div className="mb-6">
                <label className="text-[#9CA3AF] text-sm mb-2 block">How was the mood today?</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {moodOptions.map(option => (
                        <button
                            key={option.label}
                            onClick={() => setSelectedMood(option.label)}
                            className={`p-3 rounded-xl transition-all duration-200 flex flex-col items-center gap-1 ${
                                selectedMood === option.label 
                                ? `${option.color} ring-2 ring-white scale-105` 
                                : 'bg-[#252836] text-[#9CA3AF] hover:bg-[#3A3F55]'
                            }`}
                        >
                            <span className="text-2xl">{option.emoji}</span>
                            <span className="text-xs font-bold">{option.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="mb-6">
                <label className="text-[#9CA3AF] text-sm mb-2 block">Any Triggers?</label>
                <div className="flex flex-wrap gap-2">
                    {triggerOptions.map(trigger => (
                        <button
                            key={trigger}
                            onClick={() => toggleTrigger(trigger)}
                            className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                                triggers.includes(trigger)
                                ? 'bg-[#B0C4DE] text-[#252836]'
                                : 'bg-[#252836] text-[#9CA3AF] border border-[#4B5563]'
                            }`}
                        >
                            {trigger}
                        </button>
                    ))}
                </div>
            </div>

            <Button variant="success" className="w-full" size="sm" icon={<Save size={16} />} onClick={handleSave} disabled={!selectedMood}>
                Save Log
            </Button>
        </div>

        {/* History List */}
        <div className="bg-[#2E3244] p-6 rounded-3xl shadow-lg">
           <div className="flex items-center gap-2 mb-6">
                <Clock className="text-[#B0C4DE]" />
                <h2 className="text-xl font-bold text-[#FDF5E6]">Log History</h2>
            </div>
            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
                {logs.length === 0 && (
                    <p className="text-[#9CA3AF] italic text-center py-8">No logs recorded yet.</p>
                )}
                {logs.map(log => (
                    <div key={log.id} className="bg-[#252836] p-4 rounded-xl border border-[#4B5563]">
                        <div className="flex justify-between items-start mb-2">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${
                                log.mood === 'Calm' ? 'bg-[#9CAF88] text-white' :
                                log.mood === 'Meltdown' ? 'bg-[#E29578] text-white' : 'bg-[#B0C4DE] text-[#252836]'
                            }`}>
                                {log.mood}
                            </span>
                            <span className="text-[#9CA3AF] text-xs">{log.date}</span>
                        </div>
                        {log.triggers.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                                {log.triggers.map(t => (
                                    <span key={t} className="text-[10px] bg-[#2E3244] text-[#9CA3AF] px-2 py-0.5 rounded-full border border-[#4B5563]">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingLog;
