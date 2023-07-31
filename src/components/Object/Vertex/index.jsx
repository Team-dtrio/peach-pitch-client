function Vertex({ position, size, onVertexDrag, cursorType }) {
  const handleMouseDown = (event) => {
    event.stopPropagation();
    onVertexDrag(event);
  };

  const styles = {
    position: "absolute",
    left: `${position.x}px`,
    top: `${position.y}px`,
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: "#000",
    borderRadius: "50%",
    cursor: cursorType,
  };

  return (
    <div style={styles} onMouseDown={handleMouseDown} aria-hidden="true" />
  );
}

export default Vertex;
