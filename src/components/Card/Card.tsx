import type { Card } from "../../types";

interface CardProps {
  emoji: Card;
  index: number;
  flipped: number[];
  matched: number[];
  onClick: (index: number) => void;
}

export default function Card({ emoji, index, flipped, matched, onClick }: CardProps) {
  return (
    <div
      className={`memory-card ${
        flipped.includes(index) || matched.includes(index) ? "card-back" : "card-front"
      } rounded-3`}
      onClick={() => onClick(index)}
    >
      {flipped.includes(index) || matched.includes(index) ? emoji : "?"}
    </div>
  );
}