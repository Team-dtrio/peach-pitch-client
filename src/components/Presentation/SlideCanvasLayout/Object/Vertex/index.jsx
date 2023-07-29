function Vertex(props) {
  const { position, size, onVertexDrag, cursorType } = props;

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

  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
  return <div style={styles} onMouseDown={handleMouseDown} />;
}

export default Vertex;
