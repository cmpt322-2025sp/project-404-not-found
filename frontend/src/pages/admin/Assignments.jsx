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

    return (
        <div>
            <h2>All Assignments</h2>

            <button style={buttonStyle} onClick={() => setShowPopup(true)}>Create New Assignment</button>
            <br/>
            <br/>

            {showPopup && (
                <div style={popupStyles}>
                    <div style={popupContentStyles}>
                        <h3>Create Assignment</h3>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                                <label htmlFor="assignmentName" style={{ ...labelStyle, width: '150px' }}>
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
                                    style={inputStyle}
                                />
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                                <label htmlFor="assignmentDue" style={{ ...labelStyle, width: '150px' }}>
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
                                    style={inputStyle}
                                />
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                                <label htmlFor="assignmentClass" style={{ ...labelStyle, width: '150px' }}>
                                    Class
                                </label>
                                <select
                                    name="assignmentClass"
                                    id="assignmentClass"
                                    required
                                    value={formData.assignmentClass || ""}
                                    onChange={handleChange}
                                    style={inputStyle}
                                >
                                    <option value="" disabled>Select a Class</option>
                                    {classrooms.map((classroom, index) => (
                                        <option key={index} value={classroom._id}>{classroom.name}</option>
                                    ))}
                                </select>
                            </div>

                            {errors.server_1 && (
                                <p style={{ color: 'red', fontSize: '14px', marginBottom: '15px' }}>
                                    {errors.server_1}
                                </p>
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
                                <input
                                    type="submit"
                                    value="Create Assignment"
                                    style={buttonStyle}
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

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
                        <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Assignment Name</th>
                        <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Assigned Class</th>
                        <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Due Date</th>
                        <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {assignments.map((assignment, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                        <td style={{ padding: '10px' }}>{assignment.name}</td>
                        <td style={{ padding: '10px' }}>
                        <button style={buttonStyle} 
                            onClick={() => {navigate(`/admin/classroom?classroomName=${classrooms.find((classroom) => classroom._id === assignment.class_id).name}&classroom=${assignment.class_id}`)}}>{classrooms.find((classroom) => classroom._id === assignment.class_id).name}</button>
                        </td>
                        <td style={{ padding: '10px' }}>
                        {new Date(assignment.due_date).toLocaleString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                        </td>
                        <td>
                            <button style={buttonStyle} 
                            onClick={() => {navigate(`/admin/assignment?assignmentName=${assignment.name}&assignment=${assignment._id}`)}} >Access Assignment</button>
                            <button style={{...buttonStyle, backgroundColor:'#dd0000'}} onClick={() => {}}>Delete</button>
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

const inputStyle = {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
}

const labelStyle = {
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
    marginRight: '10px',
}

export default Assignments