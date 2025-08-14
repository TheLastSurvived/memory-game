import type { EmojiSet } from "../../types/index";
import { EMOJI_SETS } from "../../emojiSets/emojiSets";


interface PlayerFormProps {
  name: string;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStart: () => void;
  selectedSet: EmojiSet;
  setSelectedSet: (set: EmojiSet) => void;
}

export default function PlayerForm({
  name,
  onNameChange,
  onStart,
  selectedSet,
  setSelectedSet,
}: PlayerFormProps) {
  return (
    <div>
      <div className="mb-3">
        <input
          type="text"
          id="name"
          value={name}
          onChange={onNameChange}
          className="form-control w-25 mx-auto"
          placeholder="Ваше имя"
        />
      </div>
      <h4>Выберите набор эмодзи:</h4>
      <div className="d-flex justify-content-center gap-2 mb-3">
        {EMOJI_SETS.map((set) => (
          <button
            key={set.name}
            className={`btn ${
              selectedSet.name === set.name
                ? "btn-primary"
                : "btn-outline-primary"
            }`}
            onClick={() => setSelectedSet(set)}
          >
            {set.name} {set.icons[0]}
          </button>
        ))}
      </div>
     
      <button onClick={onStart} className="btn btn-danger mb-4">
        Начать игру
      </button>
    </div>
  );
}
