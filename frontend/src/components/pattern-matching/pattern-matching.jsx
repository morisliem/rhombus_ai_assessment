import { useState } from "react";
import Pagination from "../pagination/pagination"
import Table from "../table/table";
import TextArea from "../text-area/text-area";
import axios from "axios";
import "./pattern-matching.sass";

const PatternMatching = () => {
    const PAGE_SIZE = 15
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    const [array, setArray] = useState([]);
    const [userPrompt, setUserPrompt] = useState("");
    const [totalPages, setTotalPages] = useState(0)
    const [currentPage, setCurrentPages] = useState(1)
    const [isLoading, setIsLoading] = useState(false)

    const [ragexPattern, setRagexPattern] = useState("")
    const [replacementValue, setReplacementValue] = useState("")
    const [updatedTable, setUpdatedTable] = useState([]);

    const getFile = async (page) => {
        setIsLoading(true)
        try {
            const resp = await axios.get(`${BACKEND_URL}/get-file?page=${page}&page_size=${PAGE_SIZE}`)
            if (resp.status === 200) {
                setArray(resp.data.results)
                setTotalPages(resp.data.num_pages)

                if (resp.data.next == undefined) {
                    setCurrentPages(1)
                } else {
                    setCurrentPages(resp.data.next - 1)
                }
            }
            else {
                console.err("Failed to upload data")
            }
        } catch (error) {
            console.error("error when getting file from backend: ", error)
        } finally {
            setIsLoading(false)
        }

    }

    const handleUploadFile = async (e) => {
        const uploadedFile = e.target.files[0]
        setUpdatedTable([])
        if (uploadedFile) {

            const formData = new FormData()
            formData.append("file", uploadedFile)

            try {
                const resp = await axios.post(
                    `${BACKEND_URL}/upload`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    }
                )
                if (resp.status === 200) {
                    setArray(resp.data.results)
                    setTotalPages(resp.data.num_pages)
                    if (resp.data.next == undefined) {
                        setCurrentPages(1)
                    } else {
                        setCurrentPages(resp.data.next - 1)
                    }
                }
                else {
                    console.err("Failed to upload data")
                }

            } catch (err) {
                console.log("Error sending file to backend: ", err)
            }
        }
        else {
            alert("Failed to upload file")
        }
    }

    const onPageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            getFile(page)
        }
    }

    const handleUserPrompt = (e) => {
        setUserPrompt(e.target.value);
    };

    const findMatchingPattern = async (e) => {
        e.preventDefault()
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
                } else {
                    console.log("invalid response from the server: ", resp)
                }
            } else {
                console.err("Failed to find the matched pattern")
            }

        } catch (err) {
            console.error("Error uploading file: ", err)
        }
    }


    return (
        <div className="pattern-matching-container">
            <div>
                <h1>PATTERN MATCHING</h1>
                <p>Please upload a CSV or Excel file that you want to update</p>
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
                <>
                    <div >

                        <TextArea
                            handleUserPrompt={handleUserPrompt}
                            findMatchingPattern={findMatchingPattern}
                        />
                        <div className="tables-container">
                            <div className="table-wrapper">
                                <Table array={array} />

                                {updatedTable.length > 0 && (
                                    <div>
                                        <Table array={updatedTable} />
                                    </div>
                                )}
                            </div>
                        </div>

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={onPageChange}
                        />
                    </div>
                </>
            )}

        </div>
    );
};

export default PatternMatching;