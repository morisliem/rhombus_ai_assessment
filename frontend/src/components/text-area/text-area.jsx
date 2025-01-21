import React, { useEffect, useState } from "react";
import "./text-area.sass"

/**
* Represents a textarea component.
*
* @component
* @param {function} handleUserPrompt - Function to handle user prompt
* @param {function} findMatchingPattern - Function to find the matching pattern and replace it with the specified replacement value
* @returns {React.ReactElement} A textarea element.
*/
const TextArea = ({ resetTrigger, handleUserPrompt, findMatchingPattern }) => {
    const [text, setText] = useState("")

    useEffect(() => {
        setText("")
    }, [resetTrigger])

    const handleChange = (e) => {
        const value = e.target.value
        setText(value)
        handleUserPrompt(e)
    }

    return (
        <div className="textarea-container">
            <textarea
                type="text"
                placeholder="Please describe pattern you want to find"
                onChange={handleChange}
                value={text}
            ></textarea>
            <button onClick={findMatchingPattern}>Find</button>
        </div>
    )
}

export default TextArea