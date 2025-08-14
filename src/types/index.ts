export type Card = string; 
export type GameStatus = 'idle' | 'started' | 'won';

export type Records = {
  id: number;
  name: string;
  moves: number;
};

export type EmojiSet = {
  name: string;
  icons: string[];
};