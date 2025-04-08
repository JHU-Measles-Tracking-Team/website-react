import React, { FC, MouseEvent } from "react";

interface Props {
  className?: string;
  onClick?: (event: MouseEvent<SVGSVGElement>) => void;
}

const Exit: FC<Props> = ({ className, onClick }) => {
  return (
    <svg
      height="18"
      width="18"
      fill="none"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      className={className}
    >
      <path
        d="M2 2L16 16M16 2L2 16"
        stroke="#E07400"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
    </svg>
  );
};

export default Exit;
