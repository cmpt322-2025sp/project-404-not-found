import React, { useState, useEffect } from 'react'
import { PROCESSURL } from "../../Const"
import { useExpressServices } from "../../functions/ExpressServicesProvider"
import { useNavigate } from 'react-router-dom'

const Classrooms = () => {
    const navigate = useNavigate()

    const [csrf, setCSRF] = useState('')
    const [formData, setFormData] = useState({})
    const [errors, setErrors] = useState({ processing: false, success: false })
    const expressServices = useExpressServices()
    const [classrooms, setClassrooms] = useState([])
    const [rowsAreLoading, setRowsAreLoading] = useState(true)

    const [showPopup, setShowPopup] = useState(false)

    useEffect(() => {
        fetch(PROCESSURL + 'csrf', { method: 'GET', credentials: "include" })
            .then((res) => res.json())
            .then((response) => {
                setCSRF(response.csrf)
                return expressServices.retrieveClassrooms({ csrf: response.csrf });
            })
            .then((classroomsData) => {
                setClassrooms(classroomsData)
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
        event.preventDefault();
        if (!formData.classroomName.trim()) {
            setErrors({ server_1: "Classroom name is required" })
            return
        }
        formData['csrf'] = csrf;

        expressServices.createClassroom(formData)
            .then((result) => {
                setErrors({ processing: "Please Wait..." })
                result = JSON.parse(result);
                if (result.error) {
                    setErrors({ server_1: result.error })
                } else {
                    fetch(PROCESSURL + 'csrf', { method: 'GET', credentials: "include" })
                        .then((res) => res.json())
                        .then((response) => {
                            setCSRF(response.csrf)
                            return expressServices.retrieveClassrooms({ csrf: response.csrf })
                        })
                        .then((classroomsData) => {
                            setClassrooms(classroomsData)
                            setFormData({})
                            setErrors({ success: "Classroom Created" })
                        })
                        .catch((err) => {
                            alert("Failed to fetch classrooms after creation.");
                        })
                }
            })
            .catch(err => {
                setErrors({ server_1: "An error occurred, please try again." })
            })
    }

    const handleDelete = (classroomId) => {
        formData['csrf'] = csrf
        formData['classroomId']= classroomId
        expressServices.deleteClassroom(formData)
            .then((result) => {
                if (result === true) {
                    fetch(PROCESSURL + 'csrf', { method: 'GET', credentials: "include" })
                        .then((res) => res.json())
                        .then((response) => {
                            setCSRF(response.csrf)
                            return expressServices.retrieveClassrooms({ csrf: response.csrf })
                        })
                        .then((classroomsData) => {
                            setClassrooms(classroomsData)
                            setFormData({})
                            alert("Classroom Deleted")
                        })
                        .catch((err) => {
                            alert("Failed to fetch classrooms after deletion.");
                        })
                } else {
                    alert('Failed to delete.')
                }
            })
    }

    return (
        <div>
            <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#222', marginBottom: '20px' }}>
                📚 All Classrooms
            </h2>

            <button style={buttonStyle} onClick={() => setShowPopup(true)}>
                ➕ Create New Classroom
            </button>

            {showPopup && (
                <div style={popupStyles}>
                    <div style={popupContentStyles}>
                        <h3 style={{ marginBottom: '10px' }}>Create Classroom</h3>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                            <label htmlFor="classroomName" style={{ fontSize: '14px', color: '#333', marginBottom: '5px' }}>
                                Classroom Name
                            </label>
                            <input
                                type="text"
                                name="classroomName"
                                id="classroomName"
                                required
                                value={formData.classroomName || ''}
                                onChange={handleChange}
                                placeholder="Class 2_2027"
                                style={{
                                    padding: '10px',
                                    border: '1px solid #ccc',
                                    borderRadius: '6px',
                                    fontSize: '15px',
                                    marginBottom: '10px',
                                }}
                            />

                            {errors.server_1 && <p style={{ color: 'red' }}>{errors.server_1}</p>}
                            {errors.processing && <p style={{ color: 'orange' }}>{errors.processing}</p>}
                            {errors.success && <p style={{ color: 'green' }}>{errors.success}</p>}

                            <div style={{ marginTop: '10px' }}>
                                <input type="submit" value="Create Classroom" style={{ ...buttonStyle, marginRight: '10px' }} />
                                <button
                                    type="button"
                                    onClick={() => { setShowPopup(false); setErrors({ processing: false, success: false }) }}
                                    style={{ ...buttonStyle, backgroundColor: '#dd0000' }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <br />

            {rowsAreLoading ? (
                <p>Loading...</p>
            ) : (
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Name of Classroom</th>
                            <th style={thStyle}>Number of Students</th>
                            <th style={thStyle}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classrooms.map((classroom, index) => (
                            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9f9f9' }}>
                                <td style={tdStyle}>{classroom.name}</td>
                                <td style={tdStyle}>{classroom.students_count}</td>
                                <td style={tdStyle}>
                                    <button
                                        style={{ ...buttonStyle, marginRight: '10px' }}
                                        onClick={() => navigate(`classroom?classroomName=${classroom.name}&classroom=${classroom._id}`)}
                                    >
                                        View Classroom
                                    </button>
                                    {classroom.students_count === 0 && (
                                        <button
                                            style={{ ...buttonStyle, backgroundColor: '#dd0000' }}
                                            onClick={() => handleDelete(classroom._id)}
                                        >
                                            Delete
                                        </button>
                                    )}
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

export default Classrooms
