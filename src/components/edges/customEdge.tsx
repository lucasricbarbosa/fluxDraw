// src/components/CustomEdge.js
import { EdgeProps, Position, getSmoothStepPath } from '@xyflow/react';

const CustomEdge = ({ id, sourceX, sourceY, targetX, targetY, markerStart, markerEnd, label }:EdgeProps) => {
  // Define as posições dos marcadores
  const sourcePosition = Position.Right;
  const targetPosition = Position.Left;

  // Obtem o caminho suave, a posição do rótulo e o deslocamento
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  return (
    <>
      <path
        id={id}
        d={edgePath} // Usa o caminho suave gerado
        style={{ stroke: '#FF0072', strokeWidth: 2, fill: 'none' }}
        markerStart={markerStart}
        markerEnd={markerEnd}
      />
      {label && (
        <text x={labelX} y={labelY} fill="#1A192B" style={{ textAnchor: 'middle' }}>
          {label}
        </text>
      )}
    </>
  );
};

export default CustomEdge;
