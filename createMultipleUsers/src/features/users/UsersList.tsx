import React, { useState } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import Pagination from "../../components/Pagination";

export default function UsersList() {
  const { tempUsers } = useAppSelector((s) => s.users);

  // Khởi tạo itemsPerPage, mặc định 5
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPasswordIndexes, setShowPasswordIndexes] = useState<number[]>([]);

  // Xử lý khi user thay đổi số phần tử mỗi trang
  const onChangeItemsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = Number(e.target.value);
    if (isNaN(val) || val < 1) val = 1; // Giới hạn min = 1
    setItemsPerPage(val);
    setCurrentPage(1); // Reset về trang 1 khi thay đổi itemsPerPage
  };

  const togglePassword = (index: number) => {
    setShowPasswordIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const maskPassword = (pwd: string) => {
    if (!pwd) return "";
    return "*".repeat(pwd.length);
  };

  const totalPages = Math.ceil(tempUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = tempUsers.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="card p-3">
      <h5>Preview (temp users)</h5>

      <div className="mb-3">
        <label htmlFor="itemsPerPage" className="form-label">
          Items per page:
        </label>
        <input
          type="number"
          id="itemsPerPage"
          min={1}
          value={itemsPerPage}
          onChange={onChangeItemsPerPage}
          className="form-control"
          style={{ maxWidth: 100 }}
        />
      </div>

      {tempUsers.length === 0 ? (
        <p className="text-muted">No temp users yet. Add from form.</p>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-sm table-striped table-bordered align-middle">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Password</th>
                  <th>Phone</th>
                  <th>User Status</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((u, i) => {
                  const globalIndex = startIndex + i;
                  const showPwd = showPasswordIndexes.includes(globalIndex);
                  return (
                    <tr key={globalIndex}>
                      <td>{globalIndex + 1}</td>
                      <td>{u.username}</td>
                      <td>{u.email}</td>
                      <td>{u.firstName}</td>
                      <td>{u.lastName}</td>
                      <td style={{ whiteSpace: "nowrap" }}>
                        {showPwd ? u.password : maskPassword(u.password)}
                        <span
                          onClick={() => togglePassword(globalIndex)}
                          title={showPwd ? "Hide password" : "Show password"}
                          className="ms-2 text-primary"
                          style={{ cursor: "pointer", userSelect: "none" }}
                        >
                          {showPwd ? <EyeSlash size={18} /> : <Eye size={18} />}
                        </span>
                      </td>
                      <td>{u.phone}</td>
                      <td>{u.userStatus}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <Pagination
            current={currentPage}
            totalItems={tempUsers.length}
            itemsPerPage={itemsPerPage}
            onPrev={handlePrev}
            onNext={handleNext}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
