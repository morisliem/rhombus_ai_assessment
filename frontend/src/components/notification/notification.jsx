import { useEffect } from "react";
import "./notification.sass"


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