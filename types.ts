export enum AppView {
  LANDING = 'LANDING',
  KID_DASHBOARD = 'KID_DASHBOARD',
  KID_PUZZLE = 'KID_PUZZLE',
  KID_MIRROR = 'KID_MIRROR',
  KID_STORY = 'KID_STORY',
  PARENT_DASHBOARD = 'PARENT_DASHBOARD',
}

export enum Emotion {
  HAPPY = 'Happy',
  ANGRY = 'Angry',
  SAD = 'Sad',
  SURPRISED = 'Surprised',
}

export interface Level {
  id: string;
  name: string;
  status: 'unlocked' | 'locked' | 'completed';
  type: 'puzzle' | 'mirror' | 'story';
  stars: number;
}

// Global State Interfaces
export interface EmotionStats {
  attempts: number;
  correct: number;
}

export interface UserStats {
  [Emotion.HAPPY]: EmotionStats;
  [Emotion.ANGRY]: EmotionStats;
  [Emotion.SAD]: EmotionStats;
  [Emotion.SURPRISED]: EmotionStats;
  totalStars: number;
}

export interface MoodLog {
  id: string;
  date: string;
  mood: string;
  triggers: string[];
}

export interface Scenario {
  id: string;
  text: string;
  icon: string; // Emoji
  correctEmotion: Emotion;
}
