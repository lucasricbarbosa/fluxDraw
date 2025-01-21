import { NodeProps, Handle, Position, NodeResizer } from "@xyflow/react";
import { useState } from "react";

interface DiamondData {
  label?: string; // Adicione o tipo label
}

export function Diamond({
  selected,
  data,
}: NodeProps & { data?: DiamondData }) {
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
    <div className="losango-container">
      <NodeResizer
        minWidth={144}
        minHeight={124}
        isVisible={selected}
        lineClassName="!border-blue-400"
        handleClassName="!h-2 !w-2 !bg-white !border-2 !rounded !border-blue-400"
      />
      <Handle
        id="right"
        type="source"
        position={Position.Right}
        className="!-right-3 !h-3 !w-3 !border-2 !border-blue-400 !bg-blue-200"
      />
      <Handle
        id="left"
        type="source"
        position={Position.Left}
        className="!-left-3 !h-3 !w-3 !border-2 !border-blue-400 !bg-blue-200"
      />
      <Handle
        id="top"
        type="source"
        position={Position.Top}
        className="!-top-3 !h-3 !w-3 !border-2 !border-blue-400 !bg-blue-200"
      />
      <Handle
        id="bottom"
        type="source"
        position={Position.Bottom}
        className="!-bottom-3 !h-3 !w-3 !border-2 !border-blue-400 !bg-blue-200"
      />

      <div className="text-container">
        {isEditing ? (
          <input
            type="text"
            value={text}
            onChange={handleChange}
            className="flex-1 border-none bg-transparent text-center text-white focus:outline-none"
            placeholder="Digite seu texto aqui"
            onBlur={handleBlur}
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
    </div>
  );
}
