import { NodeProps, NodeResizer } from "@xyflow/react";
import { useState } from "react";

interface KeyData {
  label?: string; // Add the label type
}

export function BracketRight({ selected, data }: NodeProps & { data?: KeyData }) {
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
    <div className="flex items-center">
      {/* SVG Icon for the key */}
      <div className="w-full">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              className="h-full w-full"
              d="M14 21C12.8954 21 12 20.1046 12 19V15.3255C12 14.8363 12 14.5917 11.9447 14.3615C11.8957 14.1575 11.8149 13.9624 11.7053 13.7834C11.5816 13.5816 11.4086 13.4086 11.0627 13.0627L10 12L11.0627 10.9373C11.4086 10.5914 11.5816 10.4184 11.7053 10.2166C11.8149 10.0376 11.8957 9.84254 11.9447 9.63846C12 9.40829 12 9.1637 12 8.67452V5C12 3.89543 12.8954 3 14 3"
              stroke="#52525b"
              strokeWidth="0.528"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </g>
        </svg>
      </div>

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
            className="cursor-pointer text-foreground -ml-2"
            onClick={() => setIsEditing(true)} // Enables edit mode on click
          >
            {text}
          </p>
        )}
      </div>
    </div>
  );
}
