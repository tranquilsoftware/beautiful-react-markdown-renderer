import React, { useMemo, useCallback } from 'react';

export default function MermaidDiagram() {
  return {
    // This captures ```mermaid code blocks at the pre level
    pre: ({ children, ...props }: any) => {
      // Check if this pre contains a code block with language-mermaid
      const child = React.Children.toArray(children)[0];
      
      if (React.isValidElement(child) && child.props?.className?.includes('language-mermaid')) {
        const code = child.props.children;
        const content = typeof code === 'string' ? code : String(code);
        
        return <MermaidRenderer content={content.trim()} />;
      }
      
      // If not mermaid, render normal pre
      return <pre {...props}>{children}</pre>;
    }
  };
}

// Internal renderer component
const MermaidRenderer: React.FC<{ content: string }> = ({ content }) => {
  const diagramId = useMemo(
    () => `mermaid-${Math.random().toString(36).substr(2, 9)}`,
    []
  );

  const renderMermaidDiagram = useCallback(
    (mermaidContent: string) => {
      const lines = mermaidContent
        .trim()
        .split('\n')
        .filter((line) => line.trim());

      if (lines[0]?.includes('graph')) {
        // Parse flowchart
        const direction = lines[0].includes('TD') ? 'vertical' : 'horizontal';
        const connections: Array<{ from: string; to: string; label?: string }> = [];
        const nodeLabels: Record<string, string> = {};

        lines.slice(1).forEach((line) => {
          const trimmed = line.trim();

          // Parse connections like A-->B or A-->|label|B
          const connectionMatch = trimmed.match(/(\w+)-->([\|\w]*)\|?(\w+)/);
          if (connectionMatch) {
            const [, from, label, to] = connectionMatch;
            connections.push({
              from,
              to: to || label,
              label: label && label !== to ? label : undefined,
            });
          }

          // Parse node labels like A[Label]
          const labelMatch = trimmed.match(/(\w+)\[([^\]]+)\]/);
          if (labelMatch) {
            nodeLabels[labelMatch[1]] = labelMatch[2];
          }
        });

        const allNodes = [
          ...new Set(connections.flatMap((conn) => [conn.from, conn.to])),
        ];

        return (
            <div className="mermaid-flowchart my-6 rounded-xl border-2 border-primary-200 dark:border-primary-800 bg-gradient-to-br from-background-light to-background-accent dark:from-primary-950 dark:to-primary-900 p-8">
            <svg
              width="100%"
              height="300"
              viewBox="0 0 800 300"
              className="overflow-visible"
            >
              <defs>
                <marker
                  id={`arrowhead-${diagramId}`}
                  markerWidth="12"
                  markerHeight="8"
                  refX="11"
                  refY="4"
                  orient="auto"
                  markerUnits="strokeWidth"
                >
                  <path d="M0,0 L0,8 L12,4 z" className="fill-primary-500" />
                </marker>
                <filter
                  id={`shadow-${diagramId}`}
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feDropShadow
                    dx="2"
                    dy="2"
                    stdDeviation="2"
                    floodOpacity="0.3"
                    className="dark:opacity-30"
                  />
                </filter>
              </defs>
              
              {/* Render nodes */}
              {allNodes.map((node, index) => {
                const x =
                  direction === 'horizontal'
                    ? 100 + index * 150
                    : 150 + (index % 3) * 200;
                const y =
                  direction === 'horizontal'
                    ? 150
                    : 80 + Math.floor(index / 3) * 100;
                const label = nodeLabels[node] || node;

                return (
                  <g key={node}>
                    <rect
                      x={x - 40}
                      y={y - 20}
                      width={80}
                      height={40}
                      rx="8"
                      fill="#3b82f6"
                      filter={`url(#shadow-${diagramId})`}
                      className="fill-primary-600 hover:fill-primary-700 dark:fill-primary-500 dark:hover:fill-primary-400 cursor-pointer transition-colors"
                      />
                    <text
                      x={x}
                      y={y + 5}
                      textAnchor="middle"
                      fill="white"
                      fontSize="12"
                      fontWeight="600"
                    >
                      {label}
                    </text>
                  </g>
                );
              })}

              {/* Render connections */}
              {connections.map((conn, index) => {
                const fromIndex = allNodes.indexOf(conn.from);
                const toIndex = allNodes.indexOf(conn.to);

                const fromX =
                  direction === 'horizontal'
                    ? 100 + fromIndex * 150
                    : 150 + (fromIndex % 3) * 200;
                const fromY =
                  direction === 'horizontal'
                    ? 150
                    : 80 + Math.floor(fromIndex / 3) * 100;
                const toX =
                  direction === 'horizontal'
                    ? 100 + toIndex * 150
                    : 150 + (toIndex % 3) * 200;
                const toY =
                  direction === 'horizontal'
                    ? 150
                    : 80 + Math.floor(toIndex / 3) * 100;

                const startX = fromX + (toX > fromX ? 40 : -40);
                const startY = fromY;
                const endX = toX + (toX > fromX ? -40 : 40);
                const endY = toY;

                return (
                  <g key={`${conn.from}-${conn.to}-${index}`}>
                    <path
                      d={`M ${startX} ${startY} Q ${(startX + endX) / 2} ${startY - 30} ${endX} ${endY}`}
                      className="stroke-primary-500 hover:stroke-primary-600 dark:stroke-primary-400 dark:hover:stroke-primary-300 transition-colors"
                      strokeWidth="2"
                      fill="none"
                      markerEnd={`url(#arrowhead-${diagramId})`}
                    />
                    {conn.label && (
                      <text
                        x={(startX + endX) / 2}
                        y={startY - 35}
                        textAnchor="middle"
                        className="fill-gray-700 dark:fill-gray-300 text-xs font-medium"
                      >
                        {conn.label}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        );
      } else {
        // Generic diagram fallback
        return (
          <div className="mermaid-diagram rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4 my-4">
            <div className="text-center">
              <div className="whitespace-pre-line font-mono text-sm text-gray-700 dark:text-gray-300">
                {mermaidContent}
              </div>
            </div>
          </div>
        );
      }
    },
    [diagramId]
  );

  return renderMermaidDiagram(content);
};