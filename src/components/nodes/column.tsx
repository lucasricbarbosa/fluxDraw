import { NodeProps, NodeResizer } from "@xyflow/react";
import { useState } from "react";

interface SquareData {
  label?: string; // Adicione o tipo label
}

export function Column({ selected, data }: NodeProps & { data?: SquareData }) {
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
    <div className="flex relative z-0 h-full min-h-48 w-full min-w-40 flex-col items-center justify-center rounded-b-md border border-orange-500 bg-muted p-2">
      <div className="h-10 w-full fixed top-0 bg-orange-500 rounded-t-md px-5 py-2">
        {isEditing ? (
          <input
            type="text"
            value={text}
            onChange={handleChange}
            className="flex-1 border-none bg-transparent text-center text-white focus:outline-none"
            placeholder="Digite seu texto aqui"
            onBlur={handleBlur} // Atualiza o label ao sair do foco
            autoFocus
          />
        ) : (
          <p
            className="cursor-pointer text-white"
            onClick={() => setIsEditing(true)}
          >
            {text}
          </p>
        )}
      </div>
      <NodeResizer
        minWidth={160}
        minHeight={192}
        isVisible={selected}
        lineClassName="!border-blue-400"
        handleClassName="!h-2 !w-2 !bg-white !border-2 !rounded !border-blue-400"
      />
      {/* Handles omitted for brevity */}
    </div>
  );
}
