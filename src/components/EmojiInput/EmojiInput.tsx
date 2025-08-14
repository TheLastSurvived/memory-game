import { useState } from "react";
import EmojiPicker from "emoji-picker-react";

export default function EmojiInput() {
  const [input, setInput] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="emoji-input-wrapper">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="form-control w-25 mx-auto"
        disabled
        minLength={6}
        maxLength={6}
      />
      <div className="d-flex justify-content-center gap-2">
        <button
          onClick={() => setShowPicker(!showPicker)}
          className="btn btn-success my-3"
        >
          или выберите свой набор 😀
        </button>
        <button
          onClick={() => setShowPicker(!showPicker)}
          className="btn btn-warning my-3"
        >
          Очистить набор
        </button>
      </div>

      {showPicker && (
        <div className="emoji-picker-container">
          <EmojiPicker
            onEmojiClick={(emojiData) => {
              setInput((prev) => prev + emojiData.emoji);
              setShowPicker(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
