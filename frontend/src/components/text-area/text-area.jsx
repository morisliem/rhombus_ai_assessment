import React from "react";
import "./text-area.sass"

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