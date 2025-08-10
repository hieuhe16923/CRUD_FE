import React from "react";

export default function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: string }
) {
  const { variant = "primary", children, disabled, ...rest } = props;

  const style = disabled ? { cursor: "not-allowed" } : undefined;

  return (
    <button
      {...rest}
      disabled={disabled}
      style={style}
      className={`btn btn-${variant} ${rest.className ?? ""}`}
    >
      {children}
      {disabled && (
        <i
          className="bi bi-slash-circle ms-2"
          style={{ fontSize: "1rem", verticalAlign: "middle" }}
          aria-hidden="true"
          title="Disabled"
        />
      )}
    </button>
  );
}
