import React, { useState } from "react";

type AlertType = "success" | "warning" | "error";

interface AlertProps {
  type: AlertType;
  message: string;
  onClose?: () => void; // tùy chọn callback khi đóng alert
}

export default function Alert({ type, message, onClose }: AlertProps) {
  const [visible, setVisible] = useState(true);

  const alertClass =
    type === "success"
      ? "alert alert-success"
      : type === "warning"
      ? "alert alert-warning"
      : "alert alert-danger";

  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  if (!visible) return null;

  return (
    <div
      className="position-fixed top-50 start-50 translate-middle w-50 text-center"
      style={{ zIndex: 1050 }}
      role="alert"
    >
      <div
        className={`${alertClass} position-relative`}
        style={{ fontWeight: "bold" }}
      >
        {message}
        <button
          type="button"
          className="btn-close position-absolute top-0 end-0 m-2"
          aria-label="Close"
          onClick={handleClose}
        />
      </div>
    </div>
  );
}
