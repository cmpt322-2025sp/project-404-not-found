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
            <h2>All Classrooms</h2>

            <button style={buttonStyle} onClick={() => setShowPopup(true)}>Create New Classroom</button>
            <br/>
            <br/>

            {showPopup && (
                <div style={popupStyles}>
                    <div style={popupContentStyles}>
                        <h3>Create Classroom</h3>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ marginBottom: '15px' }}>
                                <label htmlFor="classroomName" style={{ fontSize: '14px', color: '#333', display: 'block', marginBottom: '5px' }}>
                                    Classroom Name
                                </label>
                                <input
                                    type="text"
                                    name="classroomName"
                                    id="classroomName"
                                    required
                                    value={formData.classroomName}
                                    onChange={handleChange}
                                    placeholder="Class 2_2027"
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        border: '1px solid #ccc',
                                        borderRadius: '4px',
                                        fontSize: '16px',
                                        boxSizing: 'border-box',
                                    }}
                                />
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
                                    value="Create Classroom"
                                    style={buttonStyle}
                                />
                                <button
                                    type="button"
                                    onClick={() => { setShowPopup(false); setErrors({ processing: false, success: false }) }}
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
                        <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Name of Classroom</th>
                        <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Number of Students</th>
                        <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {classrooms.map((classroom, index) => (
                        <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                            <td style={{ padding: '10px' }}>{classroom.name}</td>
                            <td style={{ padding: '10px' }}>{classroom.students_count}</td>
                            <td style={{ padding: '10px' }}>
                                <button style={buttonStyle} 
                                onClick={() => {navigate(`classroom?classroomName=${classroom.name}&classroom=${classroom._id}`)}} >Access Classroom</button>
                                {classroom.students_count === 0 && (
                                    <button style={{...buttonStyle, backgroundColor:'#dd0000'}} onClick={() => {handleDelete(classroom._id)}}>Delete</button>
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

export default Classrooms