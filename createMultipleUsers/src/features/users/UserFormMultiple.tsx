import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { createUsersThunk, resetStatus } from "./usersSlice";
import { validateUser } from "../../utils/validate";
import type { User } from "./types";
import Button from "../../components/Button";
import Alert from "../../components/Alert";

export default function UserFormMultiple() {
  const dispatch = useAppDispatch();
  const { error, success, tempUsers } = useAppSelector((s) => s.users);

  const [text, setText] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const [alertMsg, setAlertMsg] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | null>(null);

  const [globalLoading, setGlobalLoading] = useState(false);

  useEffect(() => {
    if (success) {
      setText("");
      setErrors([]);
      setAlertMsg("Users created successfully");
      setAlertType("success");
      dispatch(resetStatus());
      clearAlertAfterDelay();
      setGlobalLoading(false);
    }
  }, [success, dispatch]);

  useEffect(() => {
    if (error) {
      setAlertMsg(error);
      setAlertType("error");
      clearAlertAfterDelay();
      setGlobalLoading(false);
    }
  }, [error]);

  const clearAlertAfterDelay = () => {
    setTimeout(() => {
      setAlertMsg(null);
      setAlertType(null);
    }, 3000);
  };

  const Spinner = () => (
    <span
      className="spinner-border spinner-border-sm"
      role="status"
      aria-hidden="true"
      style={{ verticalAlign: "middle" }}
    />
  );

  const handleSubmit = async () => {
    try {
      const parsed = JSON.parse(text);
      if (!Array.isArray(parsed)) {
        setErrors(["JSON must be an array of users"]);
        return;
      }

      const valErrors: string[] = [];
      const validUsers: User[] = [];

      // Lấy danh sách email hiện có trong store để check trùng
      const existingEmails = tempUsers.map((u) => u.email.toLowerCase());

      // Dùng set để kiểm tra email trong mảng input có bị trùng lặp hay không
      const emailsInInput = new Set<string>();

      parsed.forEach((p: unknown, i: number) => {
        const user = p as User;

        // Kiểm tra email trùng trong input
        const emailLower = user.email.toLowerCase();

        if (emailsInInput.has(emailLower)) {
          valErrors.push(`#${i + 1}: Email is duplicated in input`);
          return;
        }

        emailsInInput.add(emailLower);

        // Validate user với danh sách email đã có
        const e = validateUser(user, existingEmails);

        if (e.length) {
          valErrors.push(`#${i + 1}: ${e.join(", ")}`);
        } else {
          validUsers.push(user);
          // Thêm email này vào existingEmails để tránh trùng với user sau
          existingEmails.push(emailLower);
        }
      });

      if (valErrors.length) {
        setErrors(valErrors);
        return;
      }

      setErrors([]);
      setGlobalLoading(true);
      await dispatch(createUsersThunk(validUsers)).unwrap();
      // success sẽ được xử lý ở useEffect
    } catch {
      setErrors(["Invalid JSON or failed to create users"]);
      setGlobalLoading(false);
    }
  };

  return (
    <div className="card p-3">
      <h5>Bulk JSON input</h5>

      {alertMsg && alertType && <Alert type={alertType} message={alertMsg} />}

      <textarea
        className="form-control"
        rows={8}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='[{"username":"a","email":"a@b.com",...}]'
        disabled={globalLoading}
      />
      {errors.length > 0 && (
        <ul className="text-danger mt-2">
          {errors.map((er, i) => (
            <li key={i}>{er}</li>
          ))}
        </ul>
      )}
      <div className="mt-2">
        <Button onClick={handleSubmit} disabled={globalLoading}>
          {globalLoading ? (
            <>
              <Spinner />{" "}
              <span style={{ verticalAlign: "middle" }}>Creating...</span>
            </>
          ) : (
            "Create Users"
          )}
        </Button>
      </div>
    </div>
  );
}
