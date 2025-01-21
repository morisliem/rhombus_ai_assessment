import React from "react";
import "./text-area.sass"

/**
* Represents a textarea component.
*
* @component
* @param {function} handleUserPrompt - Function to handle user prompt
* @param {function} findMatchingPattern - Function to find the matching pattern and replace it with the specified replacement value
* @returns {React.ReactElement} A textarea element.
*/
const TextArea = ({ handleUserPrompt, findMatchingPattern }) => {
    return (
        <div className="textarea-container">
            <textarea
                type="text"
                placeholder="Please describe pattern you want to find"
                onChange={handleUserPrompt}
            ></textarea>
            <button onClick={findMatchingPattern}>Find</button>
        </div>
    )
}

export default TextArea