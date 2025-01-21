import React from "react";

export const BracketBottomSvg: React.FC<React.SVGProps<SVGSVGElement>> = (
  props,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={33}
    height={9}
    fill="none"
    {...props}
  >
    <path
      stroke="#F97316"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.68}
      d="M1 1a3.389 3.389 0 0 0 3.389 3.389h6.226c.829 0 1.243 0 1.634.094.345.083.676.22.98.405.341.21.634.503 1.22 1.09l1.801 1.8 1.8-1.8c.587-.587.88-.88 1.222-1.09.303-.185.634-.322.98-.405.39-.094.804-.094 1.633-.094h6.226A3.389 3.389 0 0 0 31.5 1"
    />
  </svg>
);
