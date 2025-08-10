import React from "react";

export default function Pagination({
  current,
  totalItems,
  itemsPerPage,
  onPrev,
  onNext,
  onPageChange,
}: {
  current: number;
  totalItems: number;
  itemsPerPage: number;
  onPrev: () => void;
  onNext: () => void;
  onPageChange: (page: number) => void;
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const page = Number(e.target.value);
    onPageChange(page);
  };

  const pageOptions = [];
  for (let i = 1; i <= totalPages; i++) {
    pageOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return (
    <nav>
      <ul className="pagination justify-content-center align-items-center">
        <li className={`page-item ${current <= 1 ? "disabled" : ""}`}>
          <button
            className="page-link d-flex align-items-center"
            onClick={onPrev}
            disabled={current <= 1}
            style={{ gap: 4 }}
          >
            Previous
            {current <= 1 && (
              <i
                className="bi bi-slash-circle ms-1"
                style={{ fontSize: "1rem", verticalAlign: "middle" }}
                aria-hidden="true"
                title="Disabled"
              />
            )}
          </button>
        </li>

        <li className="page-item disabled">
          <span className="page-link">
            {current} / {totalPages}
          </span>
        </li>

        <li className="page-item mx-2">
          <select
            className="form-select"
            value={current}
            onChange={handleSelectChange}
            aria-label="Select page"
          >
            {pageOptions}
          </select>
        </li>

        <li className={`page-item ${current >= totalPages ? "disabled" : ""}`}>
          <button
            className="page-link d-flex align-items-center"
            onClick={onNext}
            disabled={current >= totalPages}
            style={{ gap: 4 }}
          >
            Next
            {current >= totalPages && (
              <i
                className="bi bi-slash-circle ms-1"
                style={{ fontSize: "1rem", verticalAlign: "middle" }}
                aria-hidden="true"
                title="Disabled"
              />
            )}
          </button>
        </li>
      </ul>
    </nav>
  );
}
