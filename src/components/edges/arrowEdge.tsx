import { getBgColor, getTextColor } from "@/utils/getTextAndBgColor";
import { EdgeProps, getSmoothStepPath } from "@xyflow/react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "../theme/theme-provider";

import * as ContextMenu from "@radix-ui/react-context-menu";
import { Minus, MoveRight } from "lucide-react";

interface EdgeData {
  label?: string;
  onLabelChange?: (id: string, newLabel: string) => void;
  onTypeChange?: (id: string, newType: string) => void;
}

export default function ArrowEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
  data,
  style = {},
}: EdgeProps & { data?: EdgeData }) {
  const { theme } = useTheme();

  const textRef = useRef<SVGTextElement | null>(null);
  const [rectWidth, setRectWidth] = useState(100); // Valor padrão

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState<string>(data?.label || "");

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (data?.onLabelChange) {
      data.onLabelChange(id, label);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

  useEffect(() => {
    if (textRef.current) {
      const bbox = textRef.current.getBBox();
      setRectWidth(bbox.width + 8); // Adiciona 8px à largura do texto
    }
  }, [label, data?.label]);

  const handleTypeChange = (newType: string) => {
    if (data?.onTypeChange) {
      data.onTypeChange(id, newType);
    }
  };

  return (
    <>
      <ContextMenu.Root>
        <ContextMenu.Trigger asChild>
          <path
            id={id}
            style={style}
            className="react-flow__edge-path !stroke-2 dark:stroke-white"
            d={edgePath}
            markerEnd={markerEnd}
            onDoubleClick={handleDoubleClick}
          />
        </ContextMenu.Trigger>

        <ContextMenu.Portal>
          <ContextMenu.Content
            className="rounded-md bg-white p-2 text-sm text-black shadow-md dark:bg-gray-800 dark:text-white"
            style={{ pointerEvents: "auto" }}
          >
            <ContextMenu.Item
              className="flex cursor-pointer items-center gap-6 rounded p-1 hover:bg-gray-200 dark:hover:bg-gray-600"
              onSelect={() => handleTypeChange("default")}
            >
              <Minus size={28} />
              Sem flecha
            </ContextMenu.Item>
            <ContextMenu.Item
              className="flex cursor-pointer items-center gap-6 rounded p-1 hover:bg-gray-200 dark:hover:bg-gray-600"
              onSelect={() => handleTypeChange("arrowEdge")}
            >
              <MoveRight size={28} />
              Com flecha
            </ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu.Portal>
      </ContextMenu.Root>

      {isEditing ? (
        <foreignObject width={100} height={50} x={labelX - 50} y={labelY - 34}>
          <label
            className="text-sm font-medium text-foreground"
            htmlFor="label-change-input"
          >
            Insira aqui:
          </label>
          <input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            id="label-change-input"
            autoFocus
            className="w-full rounded border bg-background px-3 py-1 text-sm font-medium text-foreground outline-none"
          />
        </foreignObject>
      ) : (
        data?.label && (
          <g>
            <rect
              z={50}
              x={labelX - rectWidth / 2} // Centraliza o retângulo
              y={labelY - 13}
              width={rectWidth}
              height={24}
              fill={getBgColor(theme)}
              rx={5}
            />
            <text
              ref={textRef} // Referência para o texto
              x={labelX}
              y={labelY}
              fill={getTextColor(theme)}
              fontSize={12}
              textAnchor="middle"
              dominantBaseline="middle"
              onDoubleClick={handleDoubleClick}
            >
              {label}
            </text>
          </g>
        )
      )}
    </>
  );
}
