import { NodeProps, NodeResizer } from "@xyflow/react";
import { useState } from "react";

interface KeyData {
  label?: string;
}

export function BracketTop({ selected, data }: NodeProps & { data?: KeyData }) {
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
        <svg
          viewBox="0 0 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M32 20C32 18.1283 30.4828 16.6111 28.6111 16.6111L22.3849 16.6111C21.556 16.6111 21.1415 16.6111 20.7514 16.5174C20.4058 16.4344 20.0752 16.2975 19.7719 16.1118C19.4299 15.9022 19.1368 15.609 18.5507 15.0229L16.75 13.2222L14.9493 15.0229C14.3632 15.609 14.0701 15.9022 13.7281 16.1118C13.4248 16.2975 13.0943 16.4344 12.7485 16.5174C12.3585 16.6111 11.944 16.6111 11.1152 16.6111H4.88889C3.01726 16.6111 1.5 18.1283 1.5 20"
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
