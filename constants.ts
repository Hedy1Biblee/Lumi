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
    name_cn: '表情星球',
    status: 'unlocked',
    type: 'puzzle',
    stars: 0,
  },
  {
    id: 'lvl2',
    name: 'Story Nebula',
    name_cn: '故事星云',
    status: 'unlocked',
    type: 'story',
    stars: 0,
  },
  {
    id: 'lvl3',
    name: 'Mirror Star',
    name_cn: '魔镜之星',
    status: 'unlocked',
    type: 'mirror',
    stars: 0,
  },
];

export const SCENARIOS: Scenario[] = [
  { id: 's1', text: 'You got a big ice cream!', text_cn: '你得到了一个大冰淇淋！', icon: '🍦', correctEmotion: Emotion.HAPPY },
  { id: 's2', text: 'Your balloon popped.', text_cn: '气球爆炸了。', icon: '🎈', correctEmotion: Emotion.SAD },
  { id: 's3', text: 'A dog barked loudly!', text_cn: '小狗大声叫！', icon: '🐕', correctEmotion: Emotion.SURPRISED },
  { id: 's4', text: 'Someone broke your toy.', text_cn: '有人弄坏了你的玩具。', icon: '🤖', correctEmotion: Emotion.ANGRY },
  { id: 's5', text: 'You are going to the park.', text_cn: '你要去公园玩。', icon: '🛝', correctEmotion: Emotion.HAPPY },
  { id: 's6', text: 'It is raining and you cannot go out.', text_cn: '下雨了，不能出去玩。', icon: '🌧️', correctEmotion: Emotion.SAD },
];
