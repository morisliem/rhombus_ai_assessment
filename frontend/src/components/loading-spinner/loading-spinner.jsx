import React from "react";
import "./loading-spinner.sass"

/**
* Represents a LoadingSpinner component.
*
* @component
* @returns {React.ReactElement} A LoadingSpinner element.
*/
const LoadingSpinner = () => {
    return (
        <div className="loading-overlay">
            <div className="spinner"></div>
        </div>
    )
}

export default LoadingSpinner