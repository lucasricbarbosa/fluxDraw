import { NodeProps, NodeResizer } from "@xyflow/react";
import { useState } from "react";

interface KeyData {
  label?: string; // Add the label type
}

export function BracketBottom({
  selected,
  data,
}: NodeProps & { data?: KeyData }) {
  const [text, setText] = useState(data?.label || "Enter text");
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleBlur = () => {
    if (data) {
      data.label = text; // Update the label in the data object
    }
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex h-full min-h-10 w-full min-w-10 items-center justify-center rounded-full">
        <NodeResizer
          minWidth={40}
          minHeight={40}
          isVisible={selected}
          lineClassName="!border-blue-400"
          handleClassName="!h-2 !w-2 !bg-white !border-2 !rounded !border-blue-400"
        />
        {isEditing ? (
          <input
            type="text"
            value={text}
            onChange={handleChange}
            className="flex-1 border-none bg-transparent text-center text-foreground focus:outline-none"
            placeholder="Digite seu texto aqui"
            onBlur={handleBlur}
            autoFocus // Auto-focus when entering edit mode
          />
        ) : (
          <p
            className="cursor-pointer text-foreground"
            onClick={() => setIsEditing(true)} // Enables edit mode on click
          >
            {text}
          </p>
        )}
      </div>

      <div className="mt-2 w-full">
        <svg viewBox="0 0 32 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1 1C1 2.87168 2.51721 4.38889 4.38889 4.38889L10.6151 4.38889C11.444 4.38889 11.8585 4.38889 12.2486 4.48259C12.5942 4.56562 12.9248 4.70253 13.2281 4.88824C13.5701 5.09784 13.8632 5.39098 14.4493 5.97709L16.25 7.77778L18.0507 5.97709C18.6368 5.39098 18.9299 5.09784 19.2719 4.88824C19.5752 4.70253 19.9057 4.56562 20.2515 4.48259C20.6415 4.38889 21.056 4.38889 21.8848 4.38889L28.1111 4.38889C29.9827 4.38889 31.5 2.87168 31.5 1"
            stroke="#52525B"
            stroke-width="0.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
