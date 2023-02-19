import React from "react";
import { COLORS } from "../constant";

export default ({ type = "border", color = COLORS.SECONDARY, size = "md" }) => {
  return (
    <div
      className={`spinner-${type} spinner-${type}-${size}`}
      style={{ color }}
      role="status"
    ></div>
  );
};
