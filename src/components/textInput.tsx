import React, { useState } from "react";

interface TextInputProps {
  initialText: string;
  onTextChange: (newText: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({ initialText, onTextChange }) => {
  const [text, setText] = useState(initialText);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleBlur = () => {
    onTextChange(text);
    setIsEditing(false);
  };

  return isEditing ? (
    <input value={text} onChange={handleChange} onBlur={handleBlur} autoFocus />
  ) : (
    <span onClick={() => setIsEditing(true)}>{text}</span>
  );
};

export default TextInput;
