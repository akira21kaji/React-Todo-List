import { useState } from "react";

function Input({ onAdd }) {
  const [text, setText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleKeyDone = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onAdd(text);
      setText("");
    }
  };

  return (
    <div className="panel-block">
      <input
        type="text"
        className="input"
        placeholder="Enter to add"
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDone}
      />
    </div>
  );
}

export default Input;
