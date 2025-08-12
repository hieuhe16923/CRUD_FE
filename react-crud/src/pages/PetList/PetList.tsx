import React, { useEffect, useMemo } from "react";
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
    const dispatch = useAppDispatch();
    const { pets, loading, error } = useAppSelector((state) => state.pets);

    useEffect(() => {
        dispatch(fetchPetsByStatus(status));
        setPage(1); // reset to page 1 on status change
    }, [dispatch, status]);

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
        }
        setJumpPageInput("");
    };

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
            <h3 className="text-center text-warning border-bottom border-2 border-warning py-2">
                Pet List
            </h3>
            <div className="row">
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
                        onPageChange={setPage}
                        totalCount={pets.length}
                        pageSize={pageSize}
                    />
                    <div className="d-flex gap-4 align-items-center">
                        <h6>Jump to page</h6>
                        <div className="d-flex">
                            <input
                                type="number"
                                className="form-control"
                                placeholder={`1 - ${totalPages}`}
                                value={jumpPageInput}
                                min={1}
                                max={totalPages}
                                onChange={(e) => setJumpPageInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleJumpPage();
                                }}
                            />

                        </div>
                        <button className="btn btn-primary" onClick={handleJumpPage}>
                            Go
                        </button>
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
