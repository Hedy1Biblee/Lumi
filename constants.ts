import { Level, Emotion, Scenario } from './types';

export const COLORS = {
  primary: '#B0C4DE', // Soft Star Blue
  accent: '#FDF5E6',  // Warm Light Yellow
  success: '#9CAF88', // Muted Sage Green
  error: '#E29578',   // Soft Coral
  background: '#252836', // Deep Space Blue
  cardBg: '#2E3244',
  textMain: '#FDF5E6',
  textMuted: '#9CA3AF',
};

export const INITIAL_LEVELS: Level[] = [
  {
    id: 'lvl1',
    name: 'Face Planet',
    status: 'unlocked',
    type: 'puzzle',
    stars: 0,
  },
  {
    id: 'lvl2',
    name: 'Story Nebula',
    status: 'unlocked',
    type: 'story',
    stars: 0,
  },
  {
    id: 'lvl3',
    name: 'Mirror Star',
    status: 'unlocked',
    type: 'mirror',
    stars: 0,
  },
];

export const SCENARIOS: Scenario[] = [
  { id: 's1', text: 'You got a big ice cream!', icon: '🍦', correctEmotion: Emotion.HAPPY },
  { id: 's2', text: 'Your balloon popped.', icon: '🎈', correctEmotion: Emotion.SAD },
  { id: 's3', text: 'A dog barked loudly!', icon: '🐕', correctEmotion: Emotion.SURPRISED },
  { id: 's4', text: 'Someone broke your toy.', icon: '🤖', correctEmotion: Emotion.ANGRY },
  { id: 's5', text: 'You are going to the park.', icon: '🛝', correctEmotion: Emotion.HAPPY },
  { id: 's6', text: 'It is raining and you cannot go out.', icon: '🌧️', correctEmotion: Emotion.SAD },
];
