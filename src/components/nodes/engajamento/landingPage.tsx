import { NodeProps, Handle, Position, NodeResizer } from "@xyflow/react";
import { useState } from "react";

import landingPageSvg from '@/assets/landingPage-svg.svg';

interface SquareData {
  label?: string;
}

export function LandingPage({ selected, data }: NodeProps & { data?: SquareData }) {
  const [text, setText] = useState(data?.label || "Anúncios Website");
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleBlur = () => {
    if (data) {
      data.label = text;
    }
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {isEditing ? (
        <input
          type="text"
          value={text}
          onChange={handleChange}
          className="flex-1 border-none bg-transparent text-center text-foreground focus:outline-none"
          placeholder="Digite seu texto aqui"
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <p
          className="cursor-pointer text-foreground text-center font-medium"
          onClick={() => setIsEditing(true)}
        >
          {text}
        </p>
      )}
      <div className="relative !z-40 flex h-full min-h-28 w-full max-w-28 max-h-28 min-w-28 items-center justify-center rounded-full border-[4px] border-orange-500 bg-secondary p-2">
        <NodeResizer
          minWidth={112}
          minHeight={112}
          isVisible={selected}
          lineClassName="!border-blue-400"
          handleClassName="!h-2 !w-2 !bg-white !border-2 !rounded !border-blue-400"
        />
        <Handle
          id="right"
          type="source"
          position={Position.Right}
          className="!-right-1 !h-3 !w-3 !border-2 !border-blue-400 !bg-blue-200"
        />
        <Handle
          id="left"
          type="source"
          position={Position.Left}
          className="!-left-1 !h-3 !w-3 !border-2 !border-blue-400 !bg-blue-200"
        />
        <img
          className="size-16"
          src={landingPageSvg}
          alt=""
        />
      </div>
    </div>
  );
}
