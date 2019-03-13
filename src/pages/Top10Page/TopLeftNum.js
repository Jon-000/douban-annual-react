
import React from 'react';

export default function TopLeftNum(props) {
  const {
    // num,
    bgColor,
    color,
  } = props;
  return (
    <div style={{
      backgroundColor: bgColor || "#fdb700",
      width: "24px",
      height: "24px",
      borderRadius: "4px 2px 24px 2px",
      position: "absolute",
      top: "-2px"
      }}>
      <span style={{
        fontSize: "10px",
        color: color || "#fff",
        position: "absolute",
        top: "4px",
        left: "8px",
        }}>{props.children}</span>
    </div>
  )
}
