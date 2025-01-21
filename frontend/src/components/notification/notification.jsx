import { useEffect } from "react";
import "./notification.sass"

/**
* Represents a Notification component.
*
* @component
* @param {string} props.message - Notification message
* @param {function} function - Function to handle close notification
* @param {function} function - Function to handle auto close notification
* @returns {React.ReactElement} A Notification element.
*/
const Notification = ({ message, onClose, autoClose = true }) => {
    useEffect(() => {
        if (autoClose) {
            const timeout = setTimeout(onClose, 2000)
            return () => clearTimeout(timeout)
        }
    }, [onClose, autoClose])

    return (
        <div className="notification-container">
            <div className="notification">
                <p>{message}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    )
}

export default Notification