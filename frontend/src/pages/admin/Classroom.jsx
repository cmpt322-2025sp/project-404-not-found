import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useExpressServices } from "../../functions/ExpressServicesProvider"
import { PROCESSURL } from "../../Const"
import { useNavigate } from 'react-router-dom'

const Classroom = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)

    const classroomName = queryParams.get('classroomName')
    const classroomId = queryParams.get('classroom')

    const [showFileUploadPopUp, setShowFileUploadPopUp] = useState(false)
    const [showAddStudentPopUp, setShowAddStudentPopUp] = useState(false)
    const [csvData, setCsvData] = useState([])
    const [loading, setLoading] = useState(false)
    const expressServices = useExpressServices()
    const [csrf, setCSRF] = useState('')
    const [errors, setErrors] = useState({ processing: false, success: false })
    const [students, setStudents] = useState([])
    const [rowsAreLoading, setRowsAreLoading] = useState(true)
    const [formData, setFormData] = useState({})
    const [classroomInfo, setClassroomInfo] = useState({})
    const [showNameChangePopup, setShowNameChangePopup] = useState(false)

    useEffect(() => {
        fetch(PROCESSURL + 'check_classroom_exists?'+queryParams, { method: 'GET', credentials: "include" })
            .then((res) => res.json())
            .then((classroom) => {
                if(!classroom.exists){
                    navigate('/page_not_found')
                }
            })

    }, [navigate])

    useEffect(() => {
        fetch(PROCESSURL + 'csrf', { method: 'GET', credentials: "include" })
            .then((res) => res.json())
            .then((response) => {
                setCSRF(response.csrf)
                return expressServices.retrieveStudents({ csrf: response.csrf, classroomId: classroomId })
            })
            .then((studentsData) => {
                setStudents(studentsData.students)
                setClassroomInfo(studentsData.classroom)
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
                                setStudents(studentsData.students)
                                setClassroomInfo(studentsData.classroom)
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

    const handleChangeNewStudent = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData(values => ({...values, [name]: value}))
    }

    const handleAddStudentForm = (event) => {
        setErrors({ processing: "Please Wait..." })
        event.preventDefault();
        formData['csrf'] = csrf;
        formData['classroomId'] = classroomId;
        expressServices.addStudent(formData)
        .then((result) => {
            if (!result.status) {
                setErrors({ server_1: result.error })
            } else {
                fetch(PROCESSURL + 'csrf', { method: 'GET', credentials: "include" })
                    .then((res) => res.json())
                    .then((response) => {
                        setCSRF(response.csrf)
                        return expressServices.retrieveStudents({ csrf: response.csrf, classroomId: classroomId })
                    })
                    .then((studentsData) => {
                        setStudents(studentsData.students)
                        setClassroomInfo(studentsData.classroom)
                        setFormData({})
                        setErrors({ success: "Student Account Created" })
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

    const handleNameChangeSubmit = (event) => {
        setErrors({ processing: "Please Wait..." })
        event.preventDefault();
        formData['csrf'] = csrf;
        formData['classroomId'] = classroomId;
        expressServices.changeClassroomName(formData)
        .then((result) => {
            if (JSON.parse(result).status === false) {
                setErrors({ server_1: JSON.parse(result).error })
            } else {
                // setRowsAreLoading(true)
                fetch(PROCESSURL + 'csrf', { method: 'GET', credentials: "include" })
                    .then((res) => res.json())
                    .then((response) => {
                        setCSRF(response.csrf)
                        return expressServices.retrieveStudents({ csrf: response.csrf, classroomId: classroomId })
                    })
                    .then((studentsData) => {
                        setStudents(studentsData.students)
                        setClassroomInfo(studentsData.classroom)
                        setFormData({})
                        setErrors({ success: "Classroom Name Updated" })
                        navigate(`/admin/classroom?classroomName=${encodeURIComponent(formData['newClassroomName'])}&classroom=${classroomId}`)
                        // setRowsAreLoading(false)
                    })
                    .catch((err) => {
                        alert("Failed to fetch students after classroom update.");
                    })
            }
        })
        .catch((error) => {
            setErrors({ server_1: "An error occurred, please try again." })
            setLoading(false)
        })
    }

    const handleChangeNameChange = (event) => {
        setFormData({})
        const name = event.target.name;
        const value = event.target.value;
        setFormData(values => ({...values, [name]: value}))
    }

    return (
        <div>
            <h2>👩‍🏫 Classrooms / {classroomName}</h2>

            <div style={{marginBottom: '10px'}}>
                <button onClick={() => setShowFileUploadPopUp(true)} style={buttonStyle}>
                    📄 Upload CSV
                </button>
                <button onClick={() => setShowAddStudentPopUp(true)} style={{...buttonStyle, marginLeft: '10px'}}>
                    🧑‍🎓 Add Student
                </button>
            </div>

            <div style={classroomInfoBox}>
                <h3 style={infoHeadingStyle}>📌 Classroom Info</h3>
                {rowsAreLoading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                    <p><strong>Classroom Name:</strong> {classroomInfo.name} <button style={{...buttonStyle, backgroundColor:'gray', marginLeft: '0.3%'}} onClick={() => setShowNameChangePopup(true)}>✏️</button> </p>
                    <p><strong>Number of Students:</strong> {classroomInfo.students_count}</p>
                    </>
                )}
            </div>

            {showNameChangePopup && (
                 <div style={popupStyles}>
                    <div style={popupContentStyles}>
                        <h3 style={{ marginBottom: '10px' }}>Change Classroom Name</h3>
                        <form onSubmit={handleNameChangeSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                                <label htmlFor="newClassroomName" style={{ fontSize: '14px', color: '#333', marginBottom: '5px' }}>
                                    Classroom Name
                                </label>
                                <input
                                    type="text"
                                    name="newClassroomName"
                                    id="newClassroomName"
                                    required
                                    value={formData.newClassroomName || ""}
                                    onChange={handleChangeNameChange}
                                    placeholder="Classroom Name"
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
                                    value="Change Classroom Name"
                                    style={{ ...buttonStyle, marginRight: '10px' }}
                                />
                                <button
                                    type="button"
                                    onClick={() => { setShowNameChangePopup(false); setErrors({ processing: false, success: false }); setFormData({}) }}
                                    style={{...buttonStyle, backgroundColor:'#dd0000'}}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showFileUploadPopUp && (
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
                                    onClick={() => {setShowFileUploadPopUp(false); setCsvData([]); setErrors({ processing: false, success: false })}}
                                    style={{...buttonStyle, backgroundColor:'#dd0000', marginLeft: '5px'}}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showAddStudentPopUp && (
                <div style={popupStyles}>
                    <div style={popupContentStyles}>
                        <h3>Add Student</h3>

                        <form onSubmit={handleAddStudentForm}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                            <label htmlFor="first_name" style={{ ...labelStyle, width: '150px' }}>First Name</label>
                            <input 
                                type="text"
                                name="first_name"
                                id="first_name"
                                required="required"
                                value={formData.first_name || ""}
                                onChange={handleChangeNewStudent}
                                placeholder="Student's First Name"
                                style={inputStyle}
                            />
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                            <label htmlFor="last_name" style={{ ...labelStyle, width: '150px' }}>Last Name</label>
                            <input 
                                type="text"
                                name="last_name"
                                id="last_name"
                                required="required"
                                value={formData.last_name || ""}
                                onChange={handleChangeNewStudent}
                                placeholder="Student's Last Name"
                                style={inputStyle}
                            />
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                            <label htmlFor="email" style={{ ...labelStyle, width: '150px' }}>Email</label>
                            <input 
                                type="email"
                                name="email"
                                id="email"
                                required="required"
                                value={formData.email || ""}
                                onChange={handleChangeNewStudent}
                                placeholder="Student's Email"
                                style={inputStyle}
                            />
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                            <label htmlFor="student_id" style={{ ...labelStyle, width: '150px' }}>Student ID</label>
                            <input 
                                type="number"
                                name="student_id"
                                id="student_id"
                                required="required"
                                value={formData.student_id || ""}
                                onChange={handleChangeNewStudent}
                                placeholder="Student ID Number"
                                style={inputStyle}
                            />
                        </div>

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

                            {errors.server_1 && (
                                <p style={{ color: 'red', fontSize: '14px', marginBottom: '15px' }}>
                                    {errors.server_1}
                                </p>
                            )}

                            <div>
                                <button type="submit" style={buttonStyle}>
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowAddStudentPopUp(false); 
                                        setFormData({}); 
                                        setErrors({ processing: false, success: false });
                                    }}
                                    style={{...buttonStyle, backgroundColor:'#dd0000', marginLeft: '5px'}}
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
                            <th style={thStyle}>Email</th>
                            <th style={thStyle}>Last Login</th>
                            <th style={thStyle}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9f9f9' }}>
                                <td style={tdStyle}>{student.first_name} {student.last_name}</td>
                                <td style={tdStyle}>{student.student_id}</td>
                                <td style={tdStyle}>{student.email}</td>
                                <td style={tdStyle}>
                                    {new Date(student.last_login).toLocaleString('en-US', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        timeZone: 'UTC',
                                    })}
                                </td>
                                <td style={tdStyle}></td>
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

const classroomInfoBox = {
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

export default Classroom