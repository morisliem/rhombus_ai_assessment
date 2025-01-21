import { useState } from "react";
import Pagination from "../pagination/pagination"
import Table from "../table/table";
import TextArea from "../text-area/text-area";
import axios from "axios";
import LoadingSpinner from "../loading-spinner/loading-spinner";
import Notification from "../notification/notification";
import "./pattern-matching.sass";

/**
* Represents a pattern matching component.
*
* @component
* @returns {React.ReactElement} A pattern matching element.
*/
const PatternMatching = () => {
    const PAGE_SIZE = 15
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    const [array, setArray] = useState([]);
    const [userPrompt, setUserPrompt] = useState("");
    const [totalPages, setTotalPages] = useState(0)
    const [currentPage, setCurrentPages] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [notificationMessage, setNotificationMessage] = useState("")

    const [ragexPattern, setRagexPattern] = useState("")
    const [replacementValue, setReplacementValue] = useState("")
    const [updatedTable, setUpdatedTable] = useState([]);

    const showNotification = (message) => {
        setNotificationMessage(message)
    }

    const closeNotification = () => {
        setNotificationMessage("")
    }

    const getFile = async (page) => {
        setIsLoading(true)
        try {
            const resp = await axios.get(`${BACKEND_URL}/get-file?page=${page}&page_size=${PAGE_SIZE}`)
            if (resp.status === 200) {
                setArray(resp.data.results)
                setTotalPages(resp.data.num_pages)

                if (resp.data.next === undefined) {
                    setCurrentPages(1)
                } else {
                    setCurrentPages(resp.data.next - 1)
                }
            }
            else {
                console.err("Failed to get file content")
                showNotification("Failed to get file content")
            }
        } catch (error) {
            console.error("error when getting file from backend: ", error)
            showNotification("Failed to get file content");
        } finally {
            setIsLoading(false)
        }

    }

    const handleUploadFile = async (e) => {
        const uploadedFile = e.target.files[0]
        if (uploadedFile) {
            setUserPrompt("")
            setUpdatedTable([])
            setIsLoading(true)

            const formData = new FormData()
            formData.append("file", uploadedFile)

            try {
                const resp = await axios.post(
                    `${BACKEND_URL}/upload`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                if (resp.status === 200) {
                    setArray(resp.data.results)
                    setTotalPages(resp.data.num_pages)
                    if (resp.data.next === undefined) {
                        setCurrentPages(1)
                    } else {
                        setCurrentPages(resp.data.next - 1)
                    }
                } else {
                    console.err("Failed to upload data")
                    showNotification("Failed to upload data");
                }
            } catch (err) {
                console.log("Error sending file to backend: ", err)
                showNotification("Failed to upload data");
            } finally {
                setIsLoading(false)
            }
        }
        else {
            showNotification("Failed to upload data");
        }
    }

    const onPageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setUserPrompt("")
            getFile(page)
            setUpdatedTable([])
        }
    }

    const handleUserPrompt = (e) => {
        setUserPrompt(e.target.value);
    };

    const findMatchingPattern = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const resp = await axios.post(
                `${BACKEND_URL}/pattern-matching?page=${currentPage}&page_size=${PAGE_SIZE}`,
                {
                    user_prompt: userPrompt
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )

            if (resp.status === 200) {
                if (resp.data.results.status === "SUCCESS") {
                    setUpdatedTable(resp.data.results.table)
                    setReplacementValue(resp.data.results.replacement_value)
                    setRagexPattern(resp.data.results.regex_pattern)
                } else if (resp.data.results.status === "FAILED") {
                    setUpdatedTable(resp.data.results.table)
                    setReplacementValue(resp.data.results.replacement_value)
                    setRagexPattern(resp.data.results.regex_pattern)

                    showNotification("No pattern matched the prompt");
                } else {
                    showNotification("Failed to process the prompt");
                    console.log("invalid response from the server: ", resp)
                }
            } else {
                showNotification("Failed to process the prompt");
            }

        } catch (err) {
            showNotification("Failed to process the prompt");
            console.error("Failed to process the prompt: ", err)
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <div className="pattern-matching-container">
            {isLoading && <LoadingSpinner />}
            {notificationMessage && <Notification message={notificationMessage} onClose={closeNotification} />}
            <div>
                <h2>PATTERN MATCHING & REPLACEMENT</h2>
                <span>Please upload a CSV or Excel file for regex pattern matching and replacement</span>
                <form>
                    <label htmlFor="fileInput" className="custom-file-label">
                        Attach File
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        onChange={handleUploadFile}
                    />
                </form>
            </div>

            {array.length > 0 && (
                <div>
                    <TextArea
                        handleUserPrompt={handleUserPrompt}
                        findMatchingPattern={findMatchingPattern}
                    />
                    <div className="tables-container">
                        <div className="table-wrapper">
                            <Table
                                array={array}
                                title={"Input data"}
                            />
                        </div>
                        {updatedTable.length > 0 && (
                            <div className="table-wrapper">
                                <Table
                                    array={updatedTable}
                                    title={"Updated data"}
                                />
                            </div>
                        )}
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={onPageChange}
                    />
                </div>
            )}
        </div >
    );
};

export default PatternMatching;