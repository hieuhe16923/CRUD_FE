// src/components/Loader.tsx
import React from "react";

type LoaderProps = {
  size?: "sm" | "md";
  color?: string; // vd: "text-primary", "text-danger"
};

export default function Loader({
  size = "md",
  color = "text-primary",
}: LoaderProps) {
  return (
    <div className="text-center my-3">
      <div
        className={`spinner-border ${
          size === "sm" ? "spinner-border-sm" : ""
        } ${color}`}
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}
