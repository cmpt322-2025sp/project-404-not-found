import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useExpressServices } from "../../functions/ExpressServicesProvider"
import { PROCESSURL } from "../../Const"
import { useNavigate } from 'react-router-dom'

const Assignment = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)

    const assignmentName = queryParams.get('assignmentName')
    const assignmentId = queryParams.get('assignment')

    const expressServices = useExpressServices()
    const [completions, setCompletions] = useState([])
    const [info, setInfo] = useState({})
    const [rowsAreLoading, setRowsAreLoading] = useState(true)
    const [csrf, setCSRF] = useState('')
    const [showDueChangePopup, setShowDueChangePopup] = useState(false)
    const [formData, setFormData] = useState({})
    const [errors, setErrors] = useState({ processing: false, success: false })

    useEffect(() => {
        fetch(PROCESSURL + 'check_assignment_exists?'+queryParams, { method: 'GET', credentials: "include" })
            .then((res) => res.json())
            .then((assignment) => {
                if(!assignment.exists){
                    navigate('/page_not_found')
                }
            })
    }, [navigate])

    useEffect(() => {
        fetch(PROCESSURL + 'csrf', { method: 'GET', credentials: "include" })
            .then((res) => res.json())
            .then((response) => {
                setCSRF(response.csrf)
                return expressServices.retrieveAssignmentCompletions({ csrf: response.csrf, assignment_id: assignmentId });
            })
            .then((completionData) => {
                setCompletions(completionData.completions)
                setInfo(completionData.assignment_info)
                setRowsAreLoading(false)
            })
            .catch((err) => {
                alert(err.error)
            })
    
    }, [])

    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setFormData(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        setErrors({ processing: "Please Wait..." })
        event.preventDefault();
        formData['csrf'] = csrf;
        formData['assignment_id'] = assignmentId;
        expressServices.changeAssignmentDueDate(formData)
            .then((result) => {
                if (result.error) {
                    setErrors({ server_1: result.error })
                } else {
                    setRowsAreLoading(true)
                    fetch(PROCESSURL + 'csrf', { method: 'GET', credentials: "include" })
                        .then((res) => res.json())
                        .then((response) => {
                            setCSRF(response.csrf)
                            setFormData([])
                            setErrors({ success: "Due Date Changed" })
                            return expressServices.retrieveAssignmentCompletions({ csrf: response.csrf, assignment_id: assignmentId })
                        })
                        .then((completionData) => {
                            setCompletions(completionData.completions)
                            setInfo(completionData.assignment_info)
                            setRowsAreLoading(false)
                        })
                        .catch((err) => {
                            alert(err.error)
                        })
                }
            })
            .catch((error) => {
                setErrors({ server_1: "An error occurred, please try again." })
            })
    }

    return (
        <div>
            <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#222', marginBottom: '20px' }}>
                📚 Assignments / {assignmentName}
            </h2>

            <div style={assignmentInfoBox}>
                <h3 style={infoHeadingStyle}>📌 Assignment Info</h3>
                {rowsAreLoading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                    <p><strong>Assignment Name:</strong> {info.name}</p>
                    <p><strong>Class:</strong> {info.class}</p>
                    <p><strong>Created On:</strong> {new Date(info.created_on).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        timeZone: 'UTC',
                    })}</p>
                    <p><strong>Due Date:</strong> {new Date(info.due_date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        timeZone: 'UTC',
                    })} <button style={{...buttonStyle, backgroundColor:'gray'}} onClick={() => {setShowDueChangePopup(true)}}>✏️📆</button> </p>
                    </>
                )}
            </div>

            {showDueChangePopup && (
                 <div style={popupStyles}>
                    <div style={popupContentStyles}>
                        <h3 style={{ marginBottom: '10px' }}>Change Due Date</h3>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                                <label htmlFor="assignmentDue" style={{ fontSize: '14px', color: '#333', marginBottom: '5px' }}>
                                    New Due Date
                                </label>
                                <input
                                    type="date"
                                    name="assignmentDue"
                                    id="assignmentDue"
                                    required
                                    value={formData.assignmentDue || ""}
                                    onChange={handleChange}
                                    placeholder="Due Date"
                                    style={{
                                        padding: '10px',
                                        border: '1px solid #ccc',
                                        borderRadius: '6px',
                                        fontSize: '15px',
                                        marginBottom: '10px',
                                        marginLeft: '10px'
                                    }}
                                />
                            </div>

                            {errors.server_1 && <p style={{ color: 'red' }}>{errors.server_1}</p>}
                            {errors.processing && <p style={{ color: 'orange' }}>{errors.processing}</p>}
                            {errors.success && <p style={{ color: 'green' }}>{errors.success}</p>}

                            <div style={{ marginTop: '10px' }}>
                                <input
                                    type="submit"
                                    value="Change Due Date"
                                    style={{ ...buttonStyle, marginRight: '10px' }}
                                />
                                <button
                                    type="button"
                                    onClick={() => { setShowDueChangePopup(false); setErrors({ processing: false, success: false }); setFormData({}) }}
                                    style={{...buttonStyle, backgroundColor:'#dd0000'}}
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
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Student Name</th>
                            <th style={thStyle}>Student ID</th>
                            <th style={thStyle}>Viewed Assignment?</th>
                            <th style={thStyle}>Eggs Collected</th>
                            <th style={thStyle}>Overall Grade</th>
                            <th style={thStyle}>Last Login</th>
                        </tr>
                    </thead>
                    <tbody>
                        {completions.map((completion, index) => (
                            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9f9f9' }}>
                                <td style={tdStyle}>{completion.first_name} {completion.last_name}</td>
                                <td style={tdStyle}>{completion.student_id}</td>
                                <td style={tdStyle}>{completion.has_viewed === true ? 'True' : 'False'}</td>
                                <td style={tdStyle}>{completion.eggs_collected}</td>
                                <td style={tdStyle}>{completion.game_string === null ? 0 : Math.round(Object.values(completion.game_string).reduce((sum, val) => sum + val, 0) / 3)}%</td>
                                <td style={tdStyle}>
                                    {new Date(completion.last_login).toLocaleString('en-US', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit',
                                        hour12: true,
                                        timeZone: 'UTC',
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

const tableStyle = {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: 0,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    borderRadius: '8px',
    overflow: 'hidden',
    marginTop: '15px',
}

const thStyle = {
    textAlign: 'left',
    padding: '14px 20px',
    backgroundColor: '#f0f2f5',
    fontWeight: '600',
    fontSize: '15px',
    color: '#333',
    borderBottom: '1px solid #ddd',
}

const tdStyle = {
    padding: '14px 20px',
    fontSize: '14px',
    color: '#555',
    borderBottom: '1px solid #eee',
}

const assignmentInfoBox = {
    backgroundColor: '#fffbe6',
    border: '1px solid #ffe58f',
    padding: '16px 20px',
    borderRadius: '8px',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    fontSize: '15px',
    color: '#333',
}

const infoHeadingStyle = {
    marginTop: 0,
    marginBottom: '10px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#d48806',
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
    zIndex: 1000,
}

const popupContentStyles = {
    backgroundColor: '#fff',
    padding: '25px',
    borderRadius: '10px',
    width: '340px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
}

export default Assignment