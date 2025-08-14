import { useState, useEffect } from "react";
import "./App.css";
import type { GameStatus, Card, Records, EmojiSet } from "./types";
import GameBoard from "./components/GameBoard/GameBoard";
import RecordsList from "./components/RecordsList/RecordsList";
import PlayerForm from "./components/PlayerForm/PlayerForm";
import Alert from "./components/Alert/Alert";

import { EMOJI_SETS } from "./emojiSets/emojiSets";

const cardImages: Card[] = [
  "🐶",
  "🐱",
  "🐭",
  "🐹",
  "🐰",
  "🦊",
  "🐶",
  "🐱",
  "🐭",
  "🐹",
  "🐰",
  "🦊",
];

function App() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [status, setStatus] = useState<GameStatus>("idle");
  const [name, setName] = useState<string>("");
  const [recordsList, setRecordsList] = useState<Records[]>([]);
  const [alertStatus, setAlertStatus] = useState<boolean>(false);
  const [selectedSet, setSelectedSet] = useState<EmojiSet>(EMOJI_SETS[0]);

  const startGame = () => {
    const selectedEmojis = selectedSet.icons.slice(0, 6);
    const pairedEmojis = [...selectedEmojis, ...selectedEmojis];
    const shuffledCards = pairedEmojis.sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setStatus("started");
    setAlertStatus(false);
  };

  const handleCardClick = (index: number) => {
    if (
      flipped.includes(index) ||
      matched.includes(index) ||
      flipped.length >= 2 ||
      status !== "started"
    )
      return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [firstIndex, secondIndex] = newFlipped;
      if (cards[firstIndex] === cards[secondIndex]) {
        setMatched([...matched, firstIndex, secondIndex]);
      }
      setTimeout(() => setFlipped([]), 1000);
      setMoves(moves + 1);
    }
  };

  useEffect(() => {
    if (matched.length === cardImages.length && matched.length > 0) {
      setStatus("won");
      setRecordsList((prevRecords) => {
        const newRecord = { id: Date.now(), name, moves };
        const updatedRecords = [...prevRecords, newRecord];
        updatedRecords.sort((a, b) => a.moves - b.moves);
        return updatedRecords.slice(0, 10);
      });
    }
  }, [matched, moves, name]);

  const changeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const startBtnHandler = () => {
    if (name === "") {
      setAlertStatus(true);
    } else {
      startGame();
    }
  };

  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4">Memory Game</h1>

      {status === "idle" && (
        <PlayerForm
          name={name}
          onNameChange={changeName}
          onStart={startBtnHandler}
           selectedSet={selectedSet}
          setSelectedSet={setSelectedSet}
        />
      )}

      {status === "started" && (
        <GameBoard
          cards={cards}
          flipped={flipped}
          matched={matched}
          moves={moves}
          status={status}
          onCardClick={handleCardClick}
         
        />
      )}

      {status === "won" && (
        <div className="alert alert-success mt-4">
          Поздравляю! Ты победил за {moves} ходов!
          <button onClick={startGame} className="btn btn-warning ms-3">
            Сыграть ещё
          </button>
          <RecordsList records={recordsList} />
        </div>
      )}
      {alertStatus === true && (
        <Alert text="Введите ваше имя для начала игры!" />
      )}
    </div>
  );
}

export default App;
