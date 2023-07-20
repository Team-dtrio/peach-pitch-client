import React from "react";

export default function Thumbnail({ scale, children }) {
  const thumbnailStyles = {
    transform: `scale(${scale})`,
    width: `${200 / scale}px`,
    height: `${200 / scale}px`,
    border: `1px solid black`,
    overflow: 'hidden',
  };

  return <div style={thumbnailStyles}>{children}</div>;
}
