import React, { useEffect, useMemo, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { fetchPetsByStatus } from "../../redux/reducers/PetsReducer";
import { Loader } from "../../components/Loader/Loader";
import Pet from "../../components/Pet/Pet";
import Pagination from "../../components/Pagination/Pagination";

const DEFAULT_PAGE_SIZE = 12;

const PetList = () => {
    const [status, setStatus] = React.useState("available");
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(DEFAULT_PAGE_SIZE);
    const [jumpPageInput, setJumpPageInput] = React.useState("");
    const [inputPageError, setInputPageError] = React.useState("");
    const [touched, setTouched] = React.useState(false);
    const dispatch = useAppDispatch();
    const { pets, loading, error } = useAppSelector((state) => state.pets);

    const listRef = useRef<HTMLDivElement>(null);
    const errorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        dispatch(fetchPetsByStatus(status));
        setPage(1); // reset to page 1 on status change
        if (listRef.current) {
            listRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [dispatch, status]);

    useEffect(() => {
        if (inputPageError && errorRef.current) {
            errorRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [inputPageError]);

    const totalPages = Math.ceil(pets.length / pageSize);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (page - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return pets.slice(firstPageIndex, lastPageIndex);
    }, [page, pets, pageSize]);

    const handleJumpPage = () => {
        const pageNumber = Number(jumpPageInput);
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setPage(pageNumber);
            if (listRef.current) {
                listRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
        setJumpPageInput("");
    };
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        if (listRef.current) {
            listRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };
    useEffect(() => {
        if (!touched || jumpPageInput.trim() === "") {
            setInputPageError("");
            return;
        }

        if (jumpPageInput.trim() === "") {
            setInputPageError("This field is required");
            return;
        }

        const num = parseInt(jumpPageInput, 10);
        const totalPages = Math.ceil(pets.length / pageSize);

        if (isNaN(num)) {
            setInputPageError("Must be a number");
            return;
        }

        if (num < 1 || num > totalPages) {
            setInputPageError(`1–${totalPages} only`);
            return;
        }

        setInputPageError(""); // valid input
    }, [jumpPageInput, touched, pets.length, pageSize]);

    if (loading) return <Loader />;
    if (error)
        return (
            <div className="text-center">
                <div className="container my-4">
                    <span className="alert alert-danger" role="alert">
                        {error}
                    </span>
                </div>
            </div>
        );

    return (
        <div className="pet-list container my-3">
            <h3 ref={listRef} className="text-center text-warning border-bottom border-2 border-warning py-2">
                Pet List
            </h3>
            <div id="pet-list" className="row">
                <div className="col-12 col-md-3 py-2">
                    <h5>Filter by status</h5>
                    <select
                        className="form-select"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="available">Available</option>
                        <option value="pending">Pending</option>
                        <option value="sold">Sold</option>
                    </select>
                </div>
                <div className="col-9">
                    <div className="row">
                        {currentTableData.length > 0 ? (
                            currentTableData.map((pet, index) => (
                                <Pet key={pet + "-" + index} pet={pet} className="col-12 col-md-4 mb-4" />
                            ))
                        ) : (
                            <p>No pets found for selected status.</p>
                        )}
                    </div>
                </div>
            </div>
            <div className="container row justify-content-center gap-5 mt-4">
                <div className="col-12 col-lg-6 d-flex flex-column align-items-center">
                    <Pagination
                        currentPage={page}
                        onPageChange={handlePageChange}
                        totalCount={pets.length}
                        pageSize={pageSize}
                    />
                    <div className="d-flex flex-column gap-4 align-items-center">
                        <label htmlFor="jump-page-input" className="visually-hidden">
                            Jump to page
                        </label>
                        <div className="d-flex gap-2">
                            <input
                                className="form-control"
                                id="jump-page-input"
                                value={jumpPageInput}
                                onChange={(event) => {
                                    setJumpPageInput(event.target.value);
                                    setTouched(true);
                                }}
                                placeholder="Enter page number"
                                type="number"
                                minLength={1}
                                // Trigger on blur or Enter
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleJumpPage();
                                    }
                                }}
                            />
                            <button className="btn btn-primary" onClick={handleJumpPage}>
                                Go
                            </button>
                        </div>
                        {inputPageError && <div ref={errorRef} id="inputPageError" className="validated-input-error text-danger">{inputPageError}</div>}
                    </div>
                </div>
                <div className="col-6 col-lg-3">
                    <h6>Items per page</h6>
                    <select
                        className="form-select"
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(Number(e.target.value));
                            setPage(1); // reset to page 1 on pageSize change
                        }}
                    >
                        {[12, 24, 48].map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default PetList;
