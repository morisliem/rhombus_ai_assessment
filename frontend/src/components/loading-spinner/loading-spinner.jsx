import React from "react";
import "./loading-spinner.sass"


const LoadingSpinner = () => {
    return (
        <div className="loading-overlay">
            <div className="spinner"></div>
        </div>
    )
}

export default LoadingSpinner