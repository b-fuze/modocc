import React from "react";

export interface defaults {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
};

// By iconmonstr
export const Up = ({ width, height, color, className }: defaults) => (
  <svg
    className={className || ""}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={width || 24}
    height={height || 24}>
    <path fill={color || "#000"} d="M7 11v13h2v-5h2v3h2v-7h2v9h2V11h6L12 0 1 11z"/>
  </svg>
);

// By iconmonstr
export const Close = ({ width, height, color, className }: defaults) => (
  <svg
    className={className || ""}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={width || 24}
    height={height || 24}>
    <path fill={color || "#000"} d="M24 20.19l-8.31-8.21 8.2-8.28-3.7-3.7-8.21 8.32L3.67.12 0 3.77l8.32 8.24-8.2 8.31L3.77 24l8.24-8.32 8.28 8.2z"/>
  </svg>
);

export default {
  Up,
  Close,
};
