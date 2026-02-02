import React, { useState, useEffect, useRef } from 'react';
import { Camera, Smile, ArrowLeft } from 'lucide-react';
import Button from '../Button';
import { Emotion, Language } from '../../types';
import { TRANSLATIONS } from '../../translations';

interface MagicMirrorProps {
  targetEmotion: Emotion;
  lang: Language;
  onComplete: (success: boolean) => void;
  onBack: () => void;
}

const MagicMirror: React.FC<MagicMirrorProps> = ({ targetEmotion, lang, onComplete, onBack }) => {
  const t = TRANSLATIONS[lang];
  const [confidence, setConfidence] = useState(0);
  const [isCapturing, setIsCapturing] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;
    const startCamera = async () => {
        try {
            stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.error("Camera error", err);
        }
    };
    startCamera();
    return () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
    }
  }, []);

  // Simulate AI Confidence
  useEffect(() => {
    if (!isCapturing || showSuccess) return;

    const interval = setInterval(() => {
      // Simulate fluctuation
      const fluctuation = Math.floor(Math.random() * 20) - 10;
      setConfidence(prev => {
        const next = Math.max(30, Math.min(95, prev + fluctuation + 2)); 
        if (next > 85) {
           setShowSuccess(true);
           setIsCapturing(false);
        }
        return next;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [isCapturing, showSuccess]);

  return (
    <div className="flex flex-col h-full relative p-4">
       <div className="absolute top-4 left-4 z-20">
        <Button variant="secondary" size="sm" onClick={onBack} icon={<ArrowLeft size={20} />}>
          {t.common.map}
        </Button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-[#FDF5E6]">{t.mirror.title} {t.emotions[targetEmotion]}</h2>
            <p className="text-[#B0C4DE]">{t.mirror.subtitle}</p>
        </div>

        {/* Camera Frame */}
        <div className="relative w-full max-w-md aspect-[3/4] bg-black rounded-3xl overflow-hidden border-4 border-[#2E3244] shadow-2xl">
            <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                className="absolute inset-0 w-full h-full object-cover opacity-80" 
            />
            
            {!videoRef.current?.srcObject && (
                 <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-gray-500">
                     <Camera size={48} />
                 </div>
            )}

            {/* AR Overlay Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-64 h-64 border-4 border-dashed border-[#FDF5E6] rounded-full opacity-50 flex items-center justify-center">
                </div>
            </div>

            {/* Success Overlay */}
            {showSuccess && (
                <div className="absolute inset-0 bg-[#9CAF88]/80 flex flex-col items-center justify-center z-10 backdrop-blur-sm animate-fade-in">
                    <Smile size={80} className="text-white mb-4 animate-bounce" />
                    <h3 className="text-3xl font-bold text-white mb-6">{t.mirror.success}</h3>
                    <Button variant="primary" onClick={() => onComplete(true)} className="shadow-lg">
                        {t.mirror.collect}
                    </Button>
                </div>
            )}
        </div>

        <div className="w-full max-w-md mt-6 bg-[#2E3244] rounded-full h-4 overflow-hidden border border-[#4B5563]">
            <div 
                className="h-full bg-gradient-to-r from-[#B0C4DE] to-[#9CAF88] transition-all duration-500 ease-out"
                style={{ width: `${confidence}%` }}
            />
        </div>
        <div className="mt-2 text-sm text-[#9CA3AF] font-medium flex justify-between w-full max-w-md px-2">
            <span>{t.mirror.matching}</span>
            <span>{Math.round(confidence)}%</span>
        </div>

      </div>
    </div>
  );
};

export default MagicMirror;
