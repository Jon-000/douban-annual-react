
import React from "react";

const Label = ({
  width,
  children
}) => {
  return (
    <span style={{
      width: width,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap" ,
    }}>
      {children}
    </span>
  )
}

export default Label;