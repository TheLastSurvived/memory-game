import type { Card, GameStatus } from "../../types/index";
import CardEmoji from "../Card/Card";

interface GameBoardProps {
  cards: Card[];
  flipped: number[];
  matched: number[];
  moves: number;
  status: GameStatus;
  onCardClick: (index: number) => void;
}

export default function GameBoard({
  cards,
  flipped,
  matched,
  moves,
  onCardClick,
}: GameBoardProps) {
  return (
    <>
      <div className="mb-3">Ходы: {moves}</div>
      <div className="cards-grid">
        {cards.map((emoji, index) => (
          <CardEmoji
            key={index}
            emoji={emoji}
            index={index}
            flipped={flipped}
            matched={matched}
            onClick={onCardClick}
          />
        ))}
      </div>
    </>
  );
}
