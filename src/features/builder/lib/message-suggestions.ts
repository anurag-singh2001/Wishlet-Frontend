export interface MessageSuggestion {
  id: string;
  style: string;
  text: string;
}

const SUGGESTIONS: Record<string, MessageSuggestion[]> = {
  birthday: [
    {
      id: "birthday-1",
      style: "Heartfelt",
      text: "Happy birthday! I hope this year brings you everything you have been working toward and a lot of joy along the way. You deserve all of it, and I am so glad you are in my life.",
    },
    {
      id: "birthday-2",
      style: "Short & sweet",
      text: "Happy birthday! Wishing you a day full of smiles, cake and people who love you.",
    },
    {
      id: "birthday-3",
      style: "Funny",
      text: "Happy birthday! You are not getting older, you are just becoming a classic. Eat the cake, ignore the candle count, and enjoy every minute.",
    },
    {
      id: "birthday-4",
      style: "Cheerful",
      text: "It's your day! Hope it is packed with laughter, surprises and all your favourite things. Go celebrate big, you have earned it!",
    },
  ],
  anniversary: [
    {
      id: "anniversary-1",
      style: "Romantic",
      text: "Every year with you feels like my favourite chapter. Thank you for your love, your patience and the way you make ordinary days feel special. Happy anniversary.",
    },
    {
      id: "anniversary-2",
      style: "Short & sweet",
      text: "Happy anniversary! Still choosing you, today and every day.",
    },
    {
      id: "anniversary-3",
      style: "Heartfelt",
      text: "Looking back at everything we have been through together, I am grateful for every moment. You are my home, my best friend and my biggest comfort. Happy anniversary.",
    },
    {
      id: "anniversary-4",
      style: "Funny",
      text: "Happy anniversary! Thanks for putting up with me all this time. I promise to keep being lovable, at least on most days.",
    },
  ],
  "thank-you": [
    {
      id: "thank-you-1",
      style: "Heartfelt",
      text: "Thank you for everything you have done for me. Your kindness meant more than you know, and I will not forget it. I am truly grateful to have you.",
    },
    {
      id: "thank-you-2",
      style: "Short & sweet",
      text: "Thank you so much. You made a real difference, and I appreciate it more than I can say.",
    },
    {
      id: "thank-you-3",
      style: "Cheerful",
      text: "You are amazing, and I wanted to say a big thank you! You brightened my week and I am smiling just thinking about it.",
    },
    {
      id: "thank-you-4",
      style: "Sincere",
      text: "I wanted to take a moment to say thank you. Your support came exactly when I needed it, and I am deeply thankful for your generosity and time.",
    },
  ],
  congratulations: [
    {
      id: "congratulations-1",
      style: "Heartfelt",
      text: "Congratulations! I have seen how hard you worked for this, and I could not be prouder. You earned every bit of it. Enjoy this moment, you deserve it.",
    },
    {
      id: "congratulations-2",
      style: "Short & sweet",
      text: "Congratulations! So happy for you. Well done, you did it!",
    },
    {
      id: "congratulations-3",
      style: "Cheerful",
      text: "Big congratulations! This is such fantastic news. Time to celebrate, because you absolutely crushed it!",
    },
    {
      id: "congratulations-4",
      style: "Funny",
      text: "Congratulations! I always knew you would pull it off, and I am only a little jealous. Dinner is on you, right?",
    },
  ],
  sorry: [
    {
      id: "sorry-1",
      style: "Sincere",
      text: "I am truly sorry for how I acted. I was wrong, and I understand why it hurt. I value you too much to let this stand between us, and I will do better.",
    },
    {
      id: "sorry-2",
      style: "Short & sweet",
      text: "I am sorry. You mean a lot to me, and I hate that I upset you.",
    },
    {
      id: "sorry-3",
      style: "Heartfelt",
      text: "I have been thinking about what happened, and I want to say sorry from the bottom of my heart. Our friendship matters to me. Whenever you are ready, I would love to talk.",
    },
    {
      id: "sorry-4",
      style: "Funny",
      text: "I messed up, and I am sorry. I would offer you chocolate, but I would probably eat it on the way. Can we start over?",
    },
  ],
};

export function suggestionsFor(occasion: string): MessageSuggestion[] {
  return SUGGESTIONS[occasion] ?? [];
}
