import { Emotion } from "./types";

export const TRANSLATIONS = {
  en: {
    landing: {
      title: "Lumi",
      subtitle: "Lighting the way for little stars",
      kidTitle: "Kid's Space",
      kidDesc: "Start your space adventure! Play games and collect stars.",
      parentTitle: "Parent's Lighthouse",
      parentDesc: "Track progress, view insights, and manage settings.",
    },
    common: {
      home: "Home",
      map: "Map",
      back: "Back",
      reset: "Reset",
      save: "Save Log",
    },
    map: {
        title: "MISSION MAP"
    },
    puzzle: {
        titlePrefix: "Make a",
        titleSuffix: "Face",
        eyes: "Eyes Here",
        mouth: "Mouth Here",
        success: "Correct!",
        instruction: "Tap a part below, then tap the face."
    },
    mirror: {
        title: "Show me:",
        subtitle: "Can you mimic the face?",
        matching: "Matching...",
        success: "You did it!",
        collect: "Collect Star!"
    },
    story: {
        question: "How do you feel?"
    },
    dashboard: {
        title: "Parent's Lighthouse",
        totalStars: "Total Stars Collected:",
        proficiency: "Real-time Proficiency",
        chartDesc: "Scores represent percentage of correct answers per emotion.",
        detailedStats: "Detailed Stats",
        monitorDesc: "Monitor accuracy to identify which emotions need more practice.",
        colEmotion: "Emotion",
        colAttempts: "Attempts",
        colCorrect: "Correct",
        colAccuracy: "Accuracy"
    },
    log: {
        checkin: "Today's Mood Check-in",
        questionMood: "How was the mood today?",
        questionTrigger: "Any Triggers?",
        history: "Log History",
        noLogs: "No logs recorded yet.",
        moods: {
            Calm: "Calm",
            Hyper: "Hyper",
            Meltdown: "Meltdown",
            Tired: "Tired"
        },
        triggers: {
            Noise: "Noise",
            "Routine Change": "Routine Change",
            Hunger: "Hunger",
            "Screen Time": "Screen Time",
            Social: "Social"
        }
    },
    emotions: {
        [Emotion.HAPPY]: "Happy",
        [Emotion.ANGRY]: "Angry",
        [Emotion.SAD]: "Sad",
        [Emotion.SURPRISED]: "Surprised"
    }
  },
  cn: {
    landing: {
      title: "Lumi",
      subtitle: "为星星的孩子照亮前路",
      kidTitle: "儿童探索空间",
      kidDesc: "开始你的太空冒险！玩游戏并收集星星。",
      parentTitle: "家长灯塔",
      parentDesc: "追踪进度，查看分析，管理设置。",
    },
    common: {
      home: "主页",
      map: "地图",
      back: "返回",
      reset: "重置",
      save: "保存记录",
    },
    map: {
        title: "任务地图"
    },
    puzzle: {
        titlePrefix: "做一个",
        titleSuffix: "的表情",
        eyes: "放眼睛",
        mouth: "放嘴巴",
        success: "正确！",
        instruction: "点击下方的部件，然后点击脸部。"
    },
    mirror: {
        title: "做给我看：",
        subtitle: "你能模仿这个表情吗？",
        matching: "匹配中...",
        success: "你做到了！",
        collect: "收集星星！"
    },
    story: {
        question: "你感觉如何？"
    },
    dashboard: {
        title: "家长灯塔",
        totalStars: "收集的星星总数：",
        proficiency: "实时熟练度",
        chartDesc: "分数代表每种情绪的正确率。",
        detailedStats: "详细统计",
        monitorDesc: "监控准确率以确定哪些情绪需要更多练习。",
        colEmotion: "情绪",
        colAttempts: "尝试次数",
        colCorrect: "正确次数",
        colAccuracy: "准确率"
    },
    log: {
        checkin: "今日心情打卡",
        questionMood: "今天心情怎么样？",
        questionTrigger: "有什么诱发因素？",
        history: "历史记录",
        noLogs: "暂无记录。",
        moods: {
            Calm: "平静",
            Hyper: "亢奋",
            Meltdown: "崩溃",
            Tired: "疲惫"
        },
        triggers: {
            Noise: "噪音",
            "Routine Change": "日程改变",
            Hunger: "饥饿",
            "Screen Time": "屏幕时间",
            Social: "社交压力"
        }
    },
    emotions: {
        [Emotion.HAPPY]: "快乐",
        [Emotion.ANGRY]: "愤怒",
        [Emotion.SAD]: "悲伤",
        [Emotion.SURPRISED]: "惊讶"
    }
  }
};