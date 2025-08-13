import React from "react";

interface TagProps {
  id: number;
  name: string;
  className?: string;
}

export const Tag: React.FC<TagProps> = ({ id, name, className = "" }) => {
  return (
    <span
      className={`px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full ${className}`}
      key={id}
    >
      {name}
    </span>
  );
};
