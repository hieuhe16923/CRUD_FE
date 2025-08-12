import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  addTempUser,
  createUsersThunk,
  removeTempUser,
  clearTempUsers,
  resetStatus,
} from "./usersSlice";
import type { User } from "./types";
import { validateUser } from "../../utils/validate";
import Button from "../../components/Button";
import Alert from "../../components/Alert";

export default function UserFormSingle() {
  const dispatch = useAppDispatch();
  // Lấy tempUsers và tempUsers2 từ Redux state
  const { tempUsers, tempUsers2, error, success } = useAppSelector(
    (s) => s.users
  );

  const [form, setForm] = useState<User>({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    userStatus: 1,
  });
  const [errors, setErrors] = useState<string[]>([]);

  // Global loading state cho tất cả thao tác
  const [globalLoading, setGlobalLoading] = useState(false);

  // Alert message và type
  const [alertMsg, setAlertMsg] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | null>(null);

  useEffect(() => {
    if (success) {
      setForm({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        userStatus: 1,
      });
      setErrors([]);
      setAlertMsg("Users created successfully");
      setAlertType("success");
      dispatch(resetStatus());
      clearAlertAfterDelay();
    }
  }, [success, dispatch]);

  useEffect(() => {
    if (error) {
      setAlertMsg(error);
      setAlertType("error");
      clearAlertAfterDelay();
    }
  }, [error]);

  const clearAlertAfterDelay = () => {
    setTimeout(() => {
      setAlertMsg(null);
      setAlertType(null);
    }, 3000);
  };

  const handleAdd = async () => {
    // Lấy danh sách email hiện có trong tempUsers và tempUsers2
    const emailsFromTempUsers = tempUsers.map((u) => u.email);
    const emailsFromTempUsers2 = tempUsers2.map((u) => u.email);

    // Tạo mảng email đã có (union)
    const existingEmails = [...emailsFromTempUsers, ...emailsFromTempUsers2];

    // Gọi validateUser với existingEmails để check trùng email
    const e = validateUser(form, existingEmails);

    if (e.length) {
      setErrors(e);
      return;
    }
    setErrors([]);
    setGlobalLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 500));
      dispatch(addTempUser(form));
      setForm({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        userStatus: 1,
      });
    } finally {
      setGlobalLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (tempUsers2.length === 0) {
      setErrors(["No users to create. Add some first."]);
      return;
    }
    setGlobalLoading(true);
    try {
      await dispatch(createUsersThunk(tempUsers2)).unwrap();

      dispatch(clearTempUsers());

      setAlertMsg("Users created and temp users cleared successfully");
      setAlertType("success");
      clearAlertAfterDelay();
    } catch {
      setAlertMsg("Failed to create users");
      setAlertType("error");
      clearAlertAfterDelay();
    } finally {
      setGlobalLoading(false);
    }
  };

  const handleRemoveUser = async (index: number) => {
    if (!window.confirm("Are you sure you want to remove this user?")) return;

    setGlobalLoading(true);

    try {
      await new Promise((r) => setTimeout(r, 500));
      dispatch(removeTempUser(index));
      setAlertMsg("User removed successfully");
      setAlertType("success");
      clearAlertAfterDelay();
    } catch {
      setAlertMsg("Failed to remove user");
      setAlertType("error");
      clearAlertAfterDelay();
    } finally {
      setGlobalLoading(false);
    }
  };

  const handleClearTemp = async () => {
    if (!window.confirm("Are you sure you want to clear all temp users?"))
      return;

    setGlobalLoading(true);

    try {
      await new Promise((r) => setTimeout(r, 500));
      dispatch(clearTempUsers());
      setAlertMsg("All temp users cleared successfully");
      setAlertType("success");
      clearAlertAfterDelay();
    } catch {
      setAlertMsg("Failed to clear temp users");
      setAlertType("error");
      clearAlertAfterDelay();
    } finally {
      setGlobalLoading(false);
    }
  };

  // Spinner component inline
  const Spinner = () => (
    <span
      className="spinner-border spinner-border-sm"
      role="status"
      aria-hidden="true"
      style={{ verticalAlign: "middle" }}
    />
  );

  return (
    <div className="card p-3 mb-3">
      <h5>Manual: Add users (will be stored temporarily)</h5>

      {alertMsg && alertType && <Alert type={alertType} message={alertMsg} />}

      <div className="row g-2">
        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            disabled={globalLoading}
          />
        </div>
        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            disabled={globalLoading}
          />
        </div>
        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="First name"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            disabled={globalLoading}
          />
        </div>
        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="Last name"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            disabled={globalLoading}
          />
        </div>
        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            disabled={globalLoading}
          />
        </div>
        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            disabled={globalLoading}
          />
        </div>
      </div>

      {errors.length > 0 && (
        <ul className="text-danger mt-2">
          {errors.map((er, i) => (
            <li key={i}>{er}</li>
          ))}
        </ul>
      )}

      <div className="mt-3">
        <Button onClick={handleAdd} className="me-2" disabled={globalLoading}>
          {globalLoading ? (
            <>
              <Spinner />{" "}
              <span style={{ verticalAlign: "middle" }}>Loading...</span>
            </>
          ) : (
            "+ Add"
          )}
        </Button>

        <Button
          variant="success"
          onClick={handleSubmit}
          disabled={globalLoading || tempUsers2.length === 0}
        >
          {globalLoading ? (
            <>
              <Spinner />{" "}
              <span style={{ verticalAlign: "middle" }}>Loading...</span>
            </>
          ) : (
            "Create All"
          )}
        </Button>

        <Button
          variant="secondary"
          className="ms-2"
          onClick={handleClearTemp}
          disabled={globalLoading || tempUsers2.length === 0}
        >
          {globalLoading ? (
            <>
              <Spinner />{" "}
              <span style={{ verticalAlign: "middle" }}>Loading...</span>
            </>
          ) : (
            "Clear Temp"
          )}
        </Button>
      </div>

      <div className="mt-3">
        <h6>Temp users ({tempUsers2.length})</h6>
        <ul className="list-group">
          {tempUsers2.map((u, idx) => (
            <li
              key={idx}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>Username:</strong> {u.username} <br />
                <strong>First Name:</strong> {u.firstName} <br />
                <strong>Last Name:</strong> {u.lastName} <br />
                <strong>Email:</strong> {u.email} <br />
                <strong>Phone:</strong> {u.phone} <br />
                <strong>User Status:</strong> {u.userStatus}
              </div>
              <div>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleRemoveUser(idx)}
                  disabled={globalLoading}
                >
                  {globalLoading ? (
                    <>
                      <Spinner />{" "}
                      <span style={{ verticalAlign: "middle" }}>
                        Loading...
                      </span>
                    </>
                  ) : (
                    "Remove"
                  )}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
