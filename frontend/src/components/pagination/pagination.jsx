import React from "react"
import "./pagination.sass"

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="pagination-container">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage == 1}
            >Previous</button>
            <span className="page-status">Page {currentPage} of {totalPages}</span>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >Next</button>
        </div>
    )
}


export default Pagination
