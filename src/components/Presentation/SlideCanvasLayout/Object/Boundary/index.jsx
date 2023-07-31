import Vertex from "../Vertex";

const vertexSize = 7;

function Boundary({ boundaryVertices, onVertexDrag }) {
  const adjustedVertices = boundaryVertices.map((vertex) => ({
    x: vertex.x - vertexSize / 2,
    y: vertex.y - vertexSize / 2,
  }));

  const svgLines = boundaryVertices.map((vertex, index, vertices) => {
    const nextVertex = vertices[(index + 1) % vertices.length];

    return (
      <line
        key={crypto.randomUUID()}
        x1={vertex.x}
        y1={vertex.y}
        x2={nextVertex.x}
        y2={nextVertex.y}
        stroke="red"
        strokeWidth="1"
      />
    );
  });

  const cursorTypes = [
    "nwse-resize",
    "ns-resize",
    "nesw-resize",
    "ew-resize",
    "nwse-resize",
    "ns-resize",
    "nesw-resize",
    "ew-resize",
  ];

  return (
    <div onMouseDown={(event) => event.stopPropagation()} aria-hidden="true">
      <svg
        style={{
          position: "absolute",
          left: "0",
          top: "0",
          width: "100%",
          height: "100%",
        }}
      >
        {svgLines}
      </svg>
      {adjustedVertices.map((vertex, index) => (
        <Vertex
          key={crypto.randomUUID()}
          position={vertex}
          size={vertexSize}
          onVertexDrag={onVertexDrag(index)}
          cursorType={cursorTypes[index]}
        />
      ))}
    </div>
  );
}

export default Boundary;
