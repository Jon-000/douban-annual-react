
import React from "react";

const Label = ({
  width,
  children,
  className // for styled
}) => {
  return (
    <span
      className={className}
      style={{
        width: width,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}>
      {children}
    </span>
  )
}

export default Label;