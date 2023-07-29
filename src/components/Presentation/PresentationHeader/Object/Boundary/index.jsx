import Vertex from "../Vertex";

const vertexSize = 7;

function Boundary(props) {
  const { boundaryVertices, onVertexDrag } = props;

  const adjustedVertices = boundaryVertices.map((vertex) => ({
    x: vertex.x - vertexSize / 2,
    y: vertex.y - vertexSize / 2,
  }));

  const svgLines = boundaryVertices.map((vertex, index, vertices) => {
    const nextVertex = vertices[(index + 1) % vertices.length];
    return (
      <line
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        x1={vertex.x}
        y1={vertex.y}
        x2={nextVertex.x}
        y2={nextVertex.y}
        stroke="red"
        strokeWidth="2"
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
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div onMouseDown={(e) => e.stopPropagation()}>
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
          // eslint-disable-next-line react/no-array-index-key
          key={index}
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
