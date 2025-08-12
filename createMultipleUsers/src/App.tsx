import React, { useState, useEffect } from "react";
import UserFormSingle from "./features/users/UserFormSingle";
import UserFormMultiple from "./features/users/UserFormMultiple";
import UsersList from "./features/users/UsersList";
import { setNetworkErrorSetter } from "./services/axiosConfig"; // hàm để set setter cho interceptor

export default function App() {
  const [activeForm, setActiveForm] = useState<"single" | "multiple">("single");
  const [networkError, setNetworkError] = useState<string | null>(null);

  // Khởi tạo setter cho interceptor
  useEffect(() => {
    setNetworkErrorSetter(setNetworkError);
  }, []);

  // Hàm xóa lỗi mạng khi đóng alert
  const clearNetworkError = () => setNetworkError(null);

  return (
    <div className="container py-4">
      <h2 className="mb-4">Batch User Admin</h2>

      {/* Button Group Toggle */}
      <div className="mb-4">
        <div
          className="btn-group"
          role="group"
          aria-label="Select input form type"
        >
          <input
            type="radio"
            className="btn-check"
            name="formType"
            id="btnSingle"
            autoComplete="off"
            checked={activeForm === "single"}
            onChange={() => setActiveForm("single")}
          />
          <label className="btn btn-outline-primary" htmlFor="btnSingle">
            Single User Input
          </label>

          <input
            type="radio"
            className="btn-check"
            name="formType"
            id="btnMultiple"
            autoComplete="off"
            checked={activeForm === "multiple"}
            onChange={() => setActiveForm("multiple")}
          />
          <label className="btn btn-outline-primary" htmlFor="btnMultiple">
            Multiple Users Input
          </label>
        </div>
      </div>

      <div className="row">
        <div>
          {activeForm === "single" ? <UserFormSingle /> : <UserFormMultiple />}
        </div>
        <div>
          <UsersList
            networkError={networkError}
            clearNetworkError={clearNetworkError}
          />
        </div>
      </div>
    </div>
  );
}
