import React, { useState, useEffect } from 'react'
import { PROCESSURL } from "../../Const"
import { useExpressServices } from "../../functions/ExpressServicesProvider"
import { useNavigate } from 'react-router-dom'

const Assignments = () => {
    const navigate = useNavigate()
    const [csrf, setCSRF] = useState('')
    const [formData, setFormData] = useState({})
    const [errors, setErrors] = useState({ processing: false, success: false })
    const expressServices = useExpressServices()
    const [assignments, setAssignments] = useState([])
    const [rowsAreLoading, setRowsAreLoading] = useState(true)
    const [showPopup, setShowPopup] = useState(false)
    const [classrooms, setClassrooms] = useState([])

    useEffect(() => {
        fetch(PROCESSURL + 'csrf', { method: 'GET', credentials: "include" })
            .then((res) => res.json())
            .then((response) => {
                setCSRF(response.csrf);
                return response.csrf;
            })
            .then((tempCSRF) => {
                return expressServices.retrieveClassrooms({ csrf: tempCSRF })
                    .then((classroomsData) => {
                        setClassrooms(classroomsData)
                        return expressServices.retrieveAssignments({ csrf: tempCSRF })
                    })
            })
            .then((assignmentsData) => {
                setAssignments(assignmentsData)
                setRowsAreLoading(false)
            })
            .catch((err) => {
                alert(err.error)
            });
    }, []);    

    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setFormData(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        setErrors({ processing: "Please Wait..." })
        event.preventDefault();
        formData['csrf'] = csrf;
        expressServices.createAssignment(formData)
            .then((result) => {
                if (result.error) {
                    setErrors({ server_1: result.error })
                } else {
                    fetch(PROCESSURL + 'csrf', { method: 'GET', credentials: "include" })
                        .then((res) => res.json())
                        .then((response) => {
                            setCSRF(response.csrf)
                            setFormData([])
                            setErrors({ success: "Assignment Created" })
                            return expressServices.retrieveAssignments({ csrf: response.csrf })
                        })
                        .then((assignmentsData) => {
                            setAssignments(assignmentsData)
                        })
                }
            })
            .catch((error) => {
                setErrors({ server_1: "An error occurred, please try again." })
            })
    }

    const deleteAssignment = (assignmentId) => {
        setFormData({})
        formData['csrf'] = csrf
        formData['assignmentId']= assignmentId
        expressServices.deleteAssignment(formData)
            .then((result) => {
                if (result === true) {
                    fetch(PROCESSURL + 'csrf', { method: 'GET', credentials: "include" })
                        .then((res) => res.json())
                        .then((response) => {
                            setCSRF(response.csrf)
                            return expressServices.retrieveAssignments({ csrf: response.csrf })
                        })
                        .then((assignmentsData) => {
                            setAssignments(assignmentsData)
                            setFormData({})
                            alert("Assignment Deleted")
                        })
                        .catch((err) => {
                            alert("Failed to fetch assignments after deletion.");
                        })
                } else {
                    alert('Failed to delete.')
                }
            })
    }

    return (
        <div>
            <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#222', marginBottom: '20px' }}>
                📁 All Assignments
            </h2>

            <button style={buttonStyle} onClick={() => setShowPopup(true)}>
                ➕ Create New Assignment
            </button>

            {showPopup && (
                <div style={popupStyles}>
                    <div style={popupContentStyles}>
                        <h3 style={{ marginBottom: '10px' }}>Create Assignment</h3>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                                <label htmlFor="assignmentName" style={{ fontSize: '14px', color: '#333', marginBottom: '5px' }}>
                                    Assignment Name
                                </label>
                                <input
                                    type="text"
                                    name="assignmentName"
                                    id="assignmentName"
                                    required
                                    value={formData.assignmentName || ""}
                                    onChange={handleChange}
                                    placeholder="Assignment Name"
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

                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                                <label htmlFor="assignmentDue" style={{ fontSize: '14px', color: '#333', marginBottom: '5px' }}>
                                    Assignment Due On
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

                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                                <label htmlFor="assignmentClass" style={{ fontSize: '14px', color: '#333', marginBottom: '5px' }}>
                                    Class
                                </label>
                                <select
                                    name="assignmentClass"
                                    id="assignmentClass"
                                    required
                                    value={formData.assignmentClass || ""}
                                    onChange={handleChange}
                                    style={{
                                        padding: '10px',
                                        border: '1px solid #ccc',
                                        borderRadius: '6px',
                                        fontSize: '15px',
                                        marginBottom: '10px',
                                        marginLeft: '10px'
                                    }}
                                >
                                    <option value="" disabled>Select a Class</option>
                                    {classrooms.map((classroom, index) => (
                                        <option key={index} value={classroom._id}>{classroom.name}</option>
                                    ))}
                                </select>
                            </div>

                            {errors.server_1 && <p style={{ color: 'red' }}>{errors.server_1}</p>}
                            {errors.processing && <p style={{ color: 'orange' }}>{errors.processing}</p>}
                            {errors.success && <p style={{ color: 'green' }}>{errors.success}</p>}

                            <div style={{ marginTop: '10px' }}>
                                <input
                                    type="submit"
                                    value="Create Assignment"
                                    style={{ ...buttonStyle, marginRight: '10px' }}
                                />
                                <button
                                    type="button"
                                    onClick={() => { setShowPopup(false); setErrors({ processing: false, success: false }); setFormData({}) }}
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
                    <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
                        <th style={thStyle}>Assignment Name</th>
                        <th style={thStyle}>Assigned Class</th>
                        <th style={thStyle}>Due Date</th>
                        <th style={thStyle}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {assignments.map((assignment, index) => (
                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9f9f9' }}>
                        <td style={tdStyle}>{assignment.name}</td>
                        <td style={tdStyle}>
                        <button style={buttonStyle} 
                            onClick={() => {navigate(`/admin/classroom?classroomName=${classrooms.find((classroom) => classroom._id === assignment.class_id).name}&classroom=${assignment.class_id}`)}}>{classrooms.find((classroom) => classroom._id === assignment.class_id).name}</button>
                        </td>
                        <td style={tdStyle}>
                        {new Date(assignment.due_date).toLocaleString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            timeZone: 'UTC',
                        })}
                        </td>
                        <td style={tdStyle}>
                            <button style={{ ...buttonStyle, marginRight: '10px' }} 
                            onClick={() => {navigate(`/admin/assignment?assignmentName=${assignment.name}&assignment=${assignment._id}`)}} >View Assignment</button>
                            <button style={{...buttonStyle, backgroundColor:'#dd0000'}} 
                                onClick={() => {
                                    const confirmation = prompt("This will delete this assignment and erase assignment progress for all students. This action is irreversible! \n\nType CONFIRM to confirm the action.");
                                    if (confirmation === "CONFIRM"){
                                        deleteAssignment(assignment._id)
                                    }
                                }}>
                                Delete Assignment
                            </button>
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

const buttonStyle = {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: '#0066dd',
    color: '#fff',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
}

export default Assignments