import { NodeProps, Handle, Position, NodeResizer } from "@xyflow/react";
import { useState } from "react";

interface CircleData {
    label?: string; // Adicione o tipo label
}

export function Circle({selected, data}: NodeProps & { data?: CircleData }) {
    const [text, setText] = useState(data?.label || 'Insira um texto');
    const [isEditing, setIsEditing] = useState(false)

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
        <div className="bg-cyan-500 flex items-center justify-center rounded-full w-full h-full min-w-36 min-h-24">
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
            className="!-right-3 !w-3 !h-3 !border-2 !border-blue-400 !bg-blue-200"
            />
            <Handle 
            id="left" 
            type="source" 
            position={Position.Left} 
            className="!-left-3 !w-3 !h-3 !border-2 !border-blue-400 !bg-blue-200"
            />
            <Handle 
            id="top"
            type="source"
            position={Position.Top} 
            className="!-top-3 !w-3 !h-3 !border-2 !border-blue-400 !bg-blue-200"
            />
            <Handle 
            id="bottom" 
            type="source" 
            position={Position.Bottom} 
            className="!-bottom-3 !w-3 !h-3 !border-2 !border-blue-400 !bg-blue-200"
            />
            {isEditing ? (
                <input 
                    type="text" 
                    value={text} 
                    onChange={handleChange} 
                    className="flex-1 bg-transparent border-none text-white focus:outline-none text-center" 
                    placeholder="Digite seu texto aqui" 
                    onBlur={handleBlur}
                    autoFocus // Foca automaticamente quando entra em modo de edição
                />
            ) : (
                <p 
                    className="text-white cursor-pointer" 
                    onClick={() => setIsEditing(true)} // Habilita o modo de edição ao clicar
                >
                    {text}
                </p>
            )}
        </div>
    )
}