import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useExpressServices } from "../../functions/ExpressServicesProvider"
import { PROCESSURL } from "../../Const"

const Classroom = () => {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)

    const classroomName = queryParams.get('classroomName')
    const classroomId = queryParams.get('classroom')

    const [showPopup, setShowPopup] = useState(false)
    const [csvData, setCsvData] = useState([])
    const [loading, setLoading] = useState(false)
    const expressServices = useExpressServices()
    const [csrf, setCSRF] = useState('')
    const [errors, setErrors] = useState({ processing: false, success: false })
    const [students, setStudents] = useState([])
    const [rowsAreLoading, setRowsAreLoading] = useState(true)

    useEffect(() => {
        fetch(PROCESSURL + 'csrf', { method: 'GET', credentials: "include" })
            .then((res) => res.json())
            .then((response) => {
                setCSRF(response.csrf)
                return expressServices.retrieveStudents({ csrf: response.csrf, classroomId: classroomId })
            })
            .then((studentsData) => {
                setStudents(studentsData)
                setRowsAreLoading(false)
            })
            .catch((err) => {
                alert(err.error)
            })

    }, [])

    const handleFileUpload = (event) => {
        const file = event.target.files[0]

        if (file) {
            setLoading(true)
            const reader = new FileReader()

            reader.onload = () => {
                const fileContent = reader.result

                const rows = fileContent.split('\n')
                const data = rows.map(row => row.split(','))

                setCsvData(data)
                setLoading(false)
            }

            reader.readAsText(file)
        }
    }

    const handleFormSubmit = (e) => {
        setErrors({ processing: "Please Wait..." })
        e.preventDefault()

        if (csvData.length > 0) {
            expressServices.uploadClassroomCSV({classroomId: classroomId, csrf: csrf, csvData: csvData})
                .then((result) => {
                    if (result.error) {
                        setErrors({ server_1: result.error })
                    } else {
                        fetch(PROCESSURL + 'csrf', { method: 'GET', credentials: "include" })
                            .then((res) => res.json())
                            .then((response) => {
                                setCSRF(response.csrf)
                                return expressServices.retrieveStudents({ csrf: response.csrf, classroomId: classroomId })
                            })
                            .then((studentsData) => {
                                setStudents(studentsData)
                                setCsvData([])
                                setErrors({ success: "Student Accounts Created" })
                            })
                            .catch((err) => {
                                alert("Failed to fetch students after creation.");
                            })
                    }
                })
                .catch((error) => {
                    setErrors({ server_1: "An error occurred, please try again." })
                    setLoading(false)
                })
        }
    }

    return (
        <div>
            <h2>Classrooms / {classroomName}</h2>

            <button onClick={() => setShowPopup(true)} style={buttonStyle}>
                Upload CSV
            </button>
            <br/>
            <br/>

            {showPopup && (
                <div style={popupStyles}>
                    <div style={popupContentStyles}>
                        <h3>Upload CSV Data</h3>

                        {loading && <p>Loading...</p>}

                        <form onSubmit={handleFormSubmit}>
                            <div style={{ marginBottom: '15px' }}>
                                <input
                                    type="file"
                                    accept=".csv"
                                    onChange={handleFileUpload}
                                    style={{ padding: '10px', width: '100%' }}
                                />
                            </div>

                            {csvData.length > 0 && (
                                <div style={{ marginBottom: '15px' }}>
                                    <p>Preview of CSV Data:</p>
                                    <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #ddd', padding: '10px' }}>
                                        <pre>{JSON.stringify(csvData, null, 2)}</pre>
                                    </div>
                                </div>
                            )}

                            {errors.processing && (
                                <p style={{ color: 'yellow', fontSize: '14px', marginBottom: '15px' }}>
                                    {errors.processing}
                                </p>
                            )}

                            {errors.success && (
                                <p style={{ color: 'green', fontSize: '14px', marginBottom: '15px' }}>
                                    {errors.success}
                                </p>
                            )}

                            <div>
                                <button type="submit" style={buttonStyle}>
                                    Upload
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {setShowPopup(false); setCsvData([]); setErrors({ processing: false, success: false })}}
                                    style={buttonStyle}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {rowsAreLoading ? (
                <p>Loading...</p>
            ) : (

                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
                            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>First Name</th>
                            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Last Name</th>
                            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Student ID</th>
                            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Email</th>
                            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Last Login</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                                <td style={{ padding: '10px' }}>{student.first_name}</td>
                                <td style={{ padding: '10px' }}>{student.last_name}</td>
                                <td style={{ padding: '10px' }}>{student.student_id}</td>
                                <td style={{ padding: '10px' }}>{student.email}</td>
                                <td style={{ padding: '10px' }}>
                                    {new Date(student.last_login).toLocaleString('en-US', {
                                        weekday: 'long', // e.g. "Monday"
                                        year: 'numeric', // e.g. "2025"
                                        month: 'long', // e.g. "March"
                                        day: 'numeric', // e.g. "30"
                                        hour: '2-digit', // e.g. "12"
                                        minute: '2-digit', // e.g. "30"
                                        second: '2-digit', // e.g. "45"
                                        hour12: true, // Use 12-hour time format with AM/PM
                                    })}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            )}
        </div>
    )
}

const popupStyles = {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

const popupContentStyles = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '5px',
    width: '300px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: '10px',
}

const buttonStyle = {
    padding: '5px 15px',
    margin: '5px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#0066dd',
    color: '#fff',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
}

export default Classroom
