import React, {useState, useEffect} from "react";
import TutorialServices from "../services/TutorialServices";
import {Link} from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";

const Tutorialsist = () => {
    const [tutorials, setTutorials] = useState([]);
    const [currentTutorial, setCurrentTutorial] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");

    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [pageSize, setPageSize] = useState(3);
    const [totalItem, setTotalItem]= useState(0);

    const pageSizes = [3, 6, 9];

    const onChangeSearchTitle = (e) => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };

    const getRequestParams = (searchTitle, page, pageSize) => {
        let params = {};

        if (searchTitle) {
            params["title"] = searchTitle;
        }

        if (page) {
            params["page"] = page - 1;
        }

        if (pageSize) {
            params["size"] = pageSize;
        }

        return params;
    };

    const retrieveTutorials = () => {
        const params = getRequestParams(searchTitle, page, pageSize);

        TutorialServices.getAll(params)
            .then((response) => {
                const {tutorials, totalPage, totalItem} = response.data;
                setTutorials(tutorials);
                setCount(totalPage);
                setTotalItem(totalItem);
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(retrieveTutorials, [searchTitle, page, pageSize]);

    const setActiveTutorial = (tutorial, index) => {
        setCurrentTutorial(tutorial);
        setCurrentIndex(index);
    };

    const removeAllTutorials = (e) => {
        console.log(e.target, " is the danger button")
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handlePageSizeChange = (event) => {
        setPageSize(event.target.value);
        setPage(1);
    };

    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by title"
                        value={searchTitle}
                        onChange={onChangeSearchTitle}
                    />

                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={retrieveTutorials}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>

            <div className="col-md-6">
                <h4>Tutorials List</h4>

                <div className="mt-3">
                    {"Items per Page: "}
                    <select onChange={handlePageSizeChange} value={pageSize}>
                        {pageSizes.map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>

                    {`Total items: ${totalItem}`}

                    <Pagination
                        className="my-3"
                        count={count}
                        page={page}
                        siblingCount={1}
                        boundaryCount={1}
                        variant="outlined"
                        shape="rounded"
                        onChange={handlePageChange}
                    />
                </div>

                <ul className="list-group">
                    {tutorials &&
                    tutorials.map((tutorial, index) => (
                        <li
                            className={
                                "list-group-item " + (index === currentIndex ? "active" : "")
                            }
                            onClick={() => setActiveTutorial(tutorial, index)}
                            key={index}
                        >
                            {tutorial.title}
                        </li>
                    ))}
                </ul>

                <button
                    className="m-3 btn btn-sm btn-danger"
                    onClick={removeAllTutorials}
                >
                    Remove All
                </button>
            </div>

            <div className="col-md-6">
                {currentTutorial ? (
                    <div>
                        <h4>Tutorial</h4>
                        <div>
                            <label>
                                <strong>Title:</strong>
                            </label>{" "}
                            {currentTutorial.title}
                        </div>
                        <div>
                            <label>
                                <strong>Description:</strong>
                            </label>{" "}
                            {currentTutorial.desc}
                        </div>
                        <div>
                            <label>
                                <strong>Status:</strong>
                            </label>{" "}
                            {currentTutorial.pub ? "Published" : "Pending"}
                        </div>

                        <Link
                            to={"/tutorials/" + currentTutorial.id}
                            className="badge badge-warning"
                        >
                            Edit
                        </Link>
                    </div>
                ) : (
                    <div>
                        <br/>
                        <p>Please click on a Tutorial...</p>
                    </div>
                )}
            </div>
        </div>
    )
};

export default Tutorialsist;
