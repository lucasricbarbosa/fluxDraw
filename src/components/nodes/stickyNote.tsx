import { NodeProps, NodeResizer } from "@xyflow/react";
import { useState } from "react";

interface StickyNoteData {
  label?: string;
}

export function StickyNote({
  selected,
  data,
}: NodeProps & { data?: StickyNoteData }) {
  const [text, setText] = useState(data?.label || "Insira um texto");
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleBlur = () => {
    if (data) {
      data.label = text; // Atualiza o label no objeto data
    }
    setIsEditing(false);
  };

  return (
    <div className="flex h-full min-h-16 w-full min-w-28 items-center justify-center rounded bg-yellow-100 p-2 shadow-xl">
      <NodeResizer
        minWidth={64}
        minHeight={112}
        isVisible={selected}
        lineClassName="!border-blue-400"
        handleClassName="!h-2 !w-2 !bg-white !border-2 !rounded !border-blue-400"
      />
      {/* Handles omitted for brevity */}
      {isEditing ? (
        <input
          type="text"
          value={text}
          onChange={handleChange}
          className="flex-1 border-none bg-transparent text-center text-xs text-zinc-800 focus:outline-none"
          placeholder="Digite seu texto aqui"
          onBlur={handleBlur} // Atualiza o label ao sair do foco
          autoFocus
        />
      ) : (
        <p
          className="cursor-pointer text-xs text-zinc-800"
          onClick={() => setIsEditing(true)}
        >
          {text}
        </p>
      )}
    </div>
  );
}
