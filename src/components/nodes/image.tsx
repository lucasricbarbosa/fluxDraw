// Image.tsx
import { NodeProps, Handle, Position, NodeResizer } from "@xyflow/react";

export function Image({ selected, data }: NodeProps) {
    return (
        <div className="relative w-full h-full min-w-32 min-h-32">
            {data.imageUrl ? (
                <img 
                    src={typeof data.imageUrl === 'string' ? data.imageUrl : ''} 
                    alt={data.altText as string || 'Node Image'} 
                    className="object-cover w-full h-full rounded" 
                    style={{ minWidth: '128px', minHeight: '128px' }} 
                />
            ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded">
                    <span>No image uploaded</span>
                </div>
            )}
            <NodeResizer 
                minWidth={128}
                minHeight={128}
                isVisible={selected}
                lineClassName="!border-blue-400"
                handleClassName="!h-2 !w-2 !bg-white !border-2 !rounded !border-blue-400"
            />
            {/* Handles para conectar outros nodes */}
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
            className="!-bottom-4 !w-3 !h-3 !border-2 !border-blue-400 !bg-blue-200"
            />
        </div>
    );
}
