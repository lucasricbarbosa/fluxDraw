import { NodeProps, Handle, Position, NodeResizer } from "@xyflow/react";
import { useState } from "react";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { getFontSizeValue } from "@/utils/getFontSize";

interface FunnelData {
  label?: string;
}

export function Funnel({ selected, data }: NodeProps & { data?: FunnelData }) {
  const [text, setText] = useState(data?.label || "Insira um texto");
  const [isEditing, setIsEditing] = useState(false);

  const [isItalic, setIsItalic] = useState(data.isItalic);
  const [isUnderline, setIsUnderline] = useState(data.isUnderline);
  const [isStrikethrough, setIsStrikethrough] = useState(data.isStrikethrough);

  const [fontWeight, setFontWeight] = useState(data?.fontWeight || "normal");
  const [fontSize, setFontSize] = useState(data?.fontSize || "base");

  const toggleStyle = (style: string) => {
    if (data) {
      switch (style) {
        case "italic":
          const newItalic = !isItalic;
          setIsItalic(newItalic);
          data.isItalic = newItalic; // Atualiza o estado do objeto data
          break;
        case "underline":
          const newUnderline = !isUnderline;
          setIsUnderline(newUnderline);
          data.isUnderline = newUnderline; // Atualiza o estado do objeto data
          break;
        case "strikethrough":
          const newStrikethrough = !isStrikethrough;
          setIsStrikethrough(newStrikethrough);
          data.isStrikethrough = newStrikethrough; // Atualiza o estado do objeto data
          break;
        default:
          break;
      }
    }
  };

  const handleFontWeightChange = (value: string) => {
    setFontWeight(value);
    if (data) {
      data.fontWeight = value;
    }
  };

  const handleFontSizeChange = (value: string) => {
    setFontSize(value);
    if (data) {
      data.fontSize = value;
    }
  };

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
    <div className="relative !z-40 flex h-full min-h-24 w-full min-w-36 items-center justify-center rounded bg-transparent p-2 funnel">
      <NodeResizer
        minWidth={144}
        minHeight={96}
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
      {/* Handles omitted for brevity */}
      {isEditing ? (
        <input
          type="text"
          value={text}
          onChange={handleChange}
          className={`flex-1 border-none bg-transparent text-center text-white focus:outline-none ${fontSize}`}
          placeholder="Digite seu texto aqui"
          onBlur={handleBlur} // Atualiza o label ao sair do foco
          autoFocus
        />
      ) : (
        <ContextMenu>
          <ContextMenuTrigger>
            <p
              className={`cursor-pointer text-white ${fontSize} ${fontWeight === "bold" ? "font-bold" : "font-normal"} ${
                data.isItalic ? "italic" : ""
              } ${data.isUnderline ? "underline" : ""} ${
                data.isStrikethrough ? "line-through" : ""
              }`}
              onClick={() => setIsEditing(true)}
            >
              {text}
            </p>
          </ContextMenuTrigger>
          <ContextMenuContent className="w-64">
            <ContextMenuLabel className="text-base" inset>
              Estilo de fonte
            </ContextMenuLabel>
            <ContextMenuSeparator />
            <ContextMenuRadioGroup
              value={String(fontWeight)}
              onValueChange={handleFontWeightChange}
            >
              <ContextMenuRadioItem value="normal">Normal</ContextMenuRadioItem>
              <ContextMenuRadioItem value="bold">Negrito</ContextMenuRadioItem>
            </ContextMenuRadioGroup>
            <ContextMenuSeparator className="mt-4" />
            <ContextMenuLabel className="text-base" inset>
              Formatações
            </ContextMenuLabel>
            <ContextMenuSeparator />
            <ContextMenuCheckboxItem
              checked={isItalic == true}
              onCheckedChange={() => toggleStyle("italic")}
            >
              Italic
            </ContextMenuCheckboxItem>

            <ContextMenuCheckboxItem
              checked={isUnderline == true}
              onCheckedChange={() => toggleStyle("underline")}
            >
              Underline
            </ContextMenuCheckboxItem>

            <ContextMenuCheckboxItem
              checked={isStrikethrough == true}
              onCheckedChange={() => toggleStyle("strikethrough")}
            >
              Strikethrough
            </ContextMenuCheckboxItem>
            <ContextMenuSeparator className="mt-4" />
            <ContextMenuLabel className="text-base" inset>
              Tamanho da fonte
            </ContextMenuLabel>
            <ContextMenuSub>
              <ContextMenuSubTrigger className="pl-8 pr-2" inset>
              {getFontSizeValue(String(fontSize))}
              </ContextMenuSubTrigger>
              <ContextMenuSubContent className="w-48">
                <ContextMenuRadioGroup
                  value={String(fontSize)}
                  onValueChange={handleFontSizeChange}
                >
                  <ContextMenuRadioItem value="text-sm">
                    14
                  </ContextMenuRadioItem>
                  <ContextMenuRadioItem value="text-base">
                    16
                  </ContextMenuRadioItem>
                  <ContextMenuRadioItem value="text-lg">
                    18
                  </ContextMenuRadioItem>
                  <ContextMenuRadioItem value="text-xl">
                    20
                  </ContextMenuRadioItem>
                  <ContextMenuRadioItem value="text-2xl">
                    24
                  </ContextMenuRadioItem>
                  <ContextMenuRadioItem value="text-4xl">
                    36
                  </ContextMenuRadioItem>
                  <ContextMenuRadioItem value="text-5xl">
                    48
                  </ContextMenuRadioItem>
                  <ContextMenuRadioItem className="textxl" value="text-6xl">
                    60
                  </ContextMenuRadioItem>
                </ContextMenuRadioGroup>
              </ContextMenuSubContent>
            </ContextMenuSub>
          </ContextMenuContent>
        </ContextMenu>
      )}
    </div>
  );
}
