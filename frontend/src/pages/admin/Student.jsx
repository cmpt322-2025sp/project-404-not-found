import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useExpressServices } from "../../functions/ExpressServicesProvider"
import { PROCESSURL } from "../../Const"

const Student = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)

    const classroomId = queryParams.get('classroom')
    const classroomName = queryParams.get('classroomName')
    const studentId = queryParams.get('student')
    const studentName = queryParams.get('studentFN') + ' ' + queryParams.get('studentLN')

    const expressServices = useExpressServices()
    const [errors, setErrors] = useState({ processing: false, success: false })
    const [rowsAreLoading, setRowsAreLoading] = useState(true)
    const [assignmentRecords, setAssignmentRecords] = useState([])
    const [studentInfo, setStudentInfo] = useState()


    useEffect(() => {
        const token = localStorage.getItem('token')
        fetch(PROCESSURL + 'check_classroom_exists?'+queryParams, { method: 'GET', credentials: "include", headers: {'Authorization': `Bearer ${token}`} })
            .then((res) => res.json())
            .then((classroom) => {
                if(!classroom.exists){
                    navigate('/page_not_found')
                }
            })
    }, [navigate])

    useEffect(() => {
        const token = localStorage.getItem('token')
        fetch(PROCESSURL + 'check_student_exists?' + queryParams, { method: 'GET', credentials: "include", headers: {'Authorization': `Bearer ${token}`} })
            .then((res) => res.json())
            .then((classroom) => {
                if (!classroom.exists) {
                    navigate('/page_not_found')
                }
            })
    }, [navigate])

    useEffect(() => {
        expressServices.retrieveStudentRecords({student_id: studentId, class_id: classroomId})
        .then((records) => {
            if (records.error) {
                setErrors({ server_1: records.error })
            }else{
                setAssignmentRecords(records.assignmentRecords)
                setStudentInfo(records.studentInfo)
                setRowsAreLoading(false)
            }
        })
        .catch((err) => {
            setErrors({ server_1: err.error })
            })
    
        }, [studentId, classroomId])


    const today = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div>
            <h2>👩‍🏫 <span onClick={() => navigate(`/admin/`)} style={{cursor: 'pointer'}}>Classrooms</span> / <span onClick={() => navigate(`/admin/classroom?classroomName=${classroomName}&classroom=${classroomId}`)} style={{cursor: 'pointer'}}>{classroomName}</span> / {studentName}</h2>
            <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>

            </div>

            {rowsAreLoading ? 'Loading Records...' : (

            <div style={reportWrapperStyle}>
                <h2 style={{ marginTop: '10px', marginBottom: '20px' }}>Report for {studentName}</h2>

                <div style={headerInfoStyle}>
                    <div style={rowStyle}>
                        <div><strong>Student ID:</strong> {studentId}</div>
                        <div><strong>Student Last Login: </strong> 
                        {new Date(studentInfo.last_login).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            timeZone: 'UTC',
                        })}
                        </div>
                    </div>
                    <div style={rowStyle}>
                        <div><strong>Class Name:</strong> {classroomName}</div>
                        <div><strong>Report Generated On:</strong> {today}</div>
                    </div>
                </div>

                <h3 style={{ marginTop: '30px', marginBottom: '10px' }}>Student Records:</h3>

                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Assignment Name</th>
                            <th style={thStyle}>Score</th>
                            <th style={thStyle}>Eggs Collected</th>
                            <th style={thStyle}>Assigned On</th>
                            <th style={thStyle}>Completed On</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assignmentRecords.map((assignment, index) => (
                            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9f9f9', color: assignment.eggs_collected ? '#555' : 'red' }}>
                                <td style={tdStyle}>{assignment.assignment_name}</td>
                                <td style={tdStyle}>{assignment.eggs_collected > 0 ? (Math.round(Object.values(assignment.game_string).reduce((sum, val) => sum + val, 0) / 3) + '%') : 'Incomplete'}</td>
                                <td style={tdStyle}>{assignment.eggs_collected}/3</td>
                                <td style={tdStyle}>
                                    {new Date(assignment.assigned_date).toLocaleString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        timeZone: 'UTC',
                                    })}
                                </td>
                                <td style={tdStyle}>
                                    {assignment.eggs_collected > 0 ? new Date(assignment.completion_date).toLocaleString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        timeZone: 'UTC',
                                    }) : 'Incomplete'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            )}
        </div>
    )
}

const reportWrapperStyle = {
    backgroundColor: '#fff',
    padding: '40px 60px',
    borderRadius: '10px',
    maxWidth: '1200px',
    minHeight: '80vh',
    margin: '20px auto',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
}

const headerInfoStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '30px',
    fontSize: '14px',
    color: '#555'
}

const rowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '40px'
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

export default Student