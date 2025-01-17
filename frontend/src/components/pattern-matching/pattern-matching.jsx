import { useState } from "react";
import * as XLSX from "xlsx";
import "./pattern-matching.sass";

const PatternMatching = () => {
    const [array, setArray] = useState([]);
    const [updatedArray, setUpdatedArray] = useState([]);
    const [userPrompt, setUserPrompt] = useState("");

    const processFile = (file) => {
        const reader = new FileReader();

        if (file.type === "text/csv") {
            reader.onload = function (event) {
                const text = event.target.result;
                csvFileToArray(text);
            };
            reader.readAsText(file);
        } else if (
            file.type ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
            file.type === "application/vnd.ms-excel"
        ) {
            reader.onload = function (event) {
                const data = new Uint8Array(event.target.result);
                const workbook = XLSX.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const json = XLSX.utils.sheet_to_json(sheet);
                setArray(json);
            };
            reader.readAsArrayBuffer(file);
        } else {
            alert("Unsupported file type! Please upload a CSV or Excel file.");
        }
    };

    const csvFileToArray = (string) => {
        const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
        const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

        const array = csvRows.map((i) => {
            const values = i.split(",");
            const obj = csvHeader.reduce((object, header, index) => {
                object[header] = values[index];
                return object;
            }, {});
            return obj;
        });

        setArray(array);
    };

    const handleUserPrompt = (e) => {
        setUserPrompt(e.target.value);
    };

    const handleOnChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUpdatedArray([]);
            processFile(file);
        }
    };

    const findMatchingPattern = (e) => {
        e.preventDefault();
        // Simulate API call or pattern matching logic
        const updated = array.map((item) => ({
            ...item
        }));
        setUpdatedArray(updated);
    };

    const headerKeys = array.length > 0 ? Object.keys(array[0]) : [];
    const updatedHeaderKeys =
        updatedArray.length > 0 ? Object.keys(updatedArray[0]) : [];

    return (
        <div className="pattern-matching-container">
            <div className="table-container">
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
                        onChange={handleOnChange}
                    />
                </form>
            </div>

            {array.length > 0 && (
                <>
                    <div className="textarea-container">
                        <textarea
                            type="text"
                            placeholder="Please describe pattern you want to find"
                            onChange={handleUserPrompt}
                        ></textarea>
                        <button onClick={findMatchingPattern}>Find</button>
                    </div>

                    <div className="tables-container">
                        <div className="table-wrapper">
                            <p>Your input data</p>
                            <table className="table">
                                <thead>
                                    <tr>
                                        {headerKeys.map((key) => (
                                            <th key={key}>{key}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {array.map((item, index) => (
                                        <tr key={index}>
                                            {Object.values(item).map(
                                                (val, i) => (
                                                    <td key={i}>{val}</td>
                                                )
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {updatedArray.length > 0 && (
                            <div className="table-wrapper">
                                <p>Your updated data</p>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            {updatedHeaderKeys.map((key) => (
                                                <th key={key}>{key}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {updatedArray.map((item, index) => (
                                            <tr key={index}>
                                                {Object.values(item).map(
                                                    (val, i) => (
                                                        <td key={i}>{val}</td>
                                                    )
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default PatternMatching;