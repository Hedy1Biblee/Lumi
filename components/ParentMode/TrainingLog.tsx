import React, { useState } from 'react';
import { Calendar, Save, Clock } from 'lucide-react';
import Button from '../Button';
import { MoodLog, Language } from '../../types';
import { TRANSLATIONS } from '../../translations';

interface TrainingLogProps {
  logs: MoodLog[];
  lang: Language;
  onSaveLog: (log: MoodLog) => void;
}

const TrainingLog: React.FC<TrainingLogProps> = ({ logs, lang, onSaveLog }) => {
  const t = TRANSLATIONS[lang];
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [triggers, setTriggers] = useState<string[]>([]);

  const moodOptions = [
    { key: 'Calm', label: t.log.moods.Calm, emoji: '😌', color: 'bg-[#9CAF88]' },
    { key: 'Hyper', label: t.log.moods.Hyper, emoji: '⚡', color: 'bg-[#F0E68C] text-[#252836]' },
    { key: 'Meltdown', label: t.log.moods.Meltdown, emoji: '🌋', color: 'bg-[#E29578]' },
    { key: 'Tired', label: t.log.moods.Tired, emoji: '😴', color: 'bg-[#B0C4DE] text-[#252836]' },
  ];

  const triggerOptions = [
      { key: 'Noise', label: t.log.triggers.Noise },
      { key: 'Routine Change', label: t.log.triggers['Routine Change'] },
      { key: 'Hunger', label: t.log.triggers.Hunger },
      { key: 'Screen Time', label: t.log.triggers['Screen Time'] },
      { key: 'Social', label: t.log.triggers.Social },
  ];

  const toggleTrigger = (triggerKey: string) => {
    // We store the localized label or the key? Storing the localized label for display
    // But for logic, it's better to store keys. For this demo, we store the label shown.
    // Actually, let's store the translated string for the log display to be consistent with what user selected.
    const triggerLabel = t.log.triggers[triggerKey as keyof typeof t.log.triggers];

    if (triggers.includes(triggerLabel)) {
      setTriggers(triggers.filter(item => item !== triggerLabel));
    } else {
      setTriggers([...triggers, triggerLabel]);
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
            <h2 className="text-xl font-bold text-[#FDF5E6] mb-4">{t.log.checkin}</h2>
            
            <div className="mb-6">
                <label className="text-[#9CA3AF] text-sm mb-2 block">{t.log.questionMood}</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {moodOptions.map(option => (
                        <button
                            key={option.key}
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
                <label className="text-[#9CA3AF] text-sm mb-2 block">{t.log.questionTrigger}</label>
                <div className="flex flex-wrap gap-2">
                    {triggerOptions.map(trigger => {
                        const isSelected = triggers.includes(trigger.label);
                        return (
                            <button
                                key={trigger.key}
                                onClick={() => toggleTrigger(trigger.key)}
                                className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                                    isSelected
                                    ? 'bg-[#B0C4DE] text-[#252836]'
                                    : 'bg-[#252836] text-[#9CA3AF] border border-[#4B5563]'
                                }`}
                            >
                                {trigger.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            <Button variant="success" className="w-full" size="sm" icon={<Save size={16} />} onClick={handleSave} disabled={!selectedMood}>
                {t.common.save}
            </Button>
        </div>

        {/* History List */}
        <div className="bg-[#2E3244] p-6 rounded-3xl shadow-lg">
           <div className="flex items-center gap-2 mb-6">
                <Clock className="text-[#B0C4DE]" />
                <h2 className="text-xl font-bold text-[#FDF5E6]">{t.log.history}</h2>
            </div>
            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
                {logs.length === 0 && (
                    <p className="text-[#9CA3AF] italic text-center py-8">{t.log.noLogs}</p>
                )}
                {logs.map(log => (
                    <div key={log.id} className="bg-[#252836] p-4 rounded-xl border border-[#4B5563]">
                        <div className="flex justify-between items-start mb-2">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${
                                log.mood === t.log.moods.Calm ? 'bg-[#9CAF88] text-white' :
                                log.mood === t.log.moods.Meltdown ? 'bg-[#E29578] text-white' : 'bg-[#B0C4DE] text-[#252836]'
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
