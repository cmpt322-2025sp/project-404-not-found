import { useLocation, Link, Route, Routes, useNavigate } from "react-router-dom"
import { useAuth } from "../functions/AuthProvider"

import Classrooms from "./admin/Classrooms"
import Classroom from "./admin/Classroom"
import Assignments from "./admin/Assignments"
import Assignment from "./admin/Assignment"
import Student from "./admin/Student"

const Admin = () => {
    const navigate = useNavigate()
    const auth = useAuth()
    const location = useLocation()

    const isAssignmentsTab = location.pathname.startsWith('/admin/assignments') || location.pathname.startsWith('/admin/assignment');
    const isClassroomsTab = !isAssignmentsTab;

    return (
        <div>
            <nav style={{ backgroundColor: '#f8f9fa', padding: '10px 20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <ul style={{ display: 'flex', listStyle: 'none', padding: 0, margin: 0, alignItems: 'center' }}>
                    <li style={{ marginRight: '15px' }}>
                        <Link
                            to="/admin/"
                            style={{
                                display: 'block',
                                textDecoration: 'none',
                                color: isClassroomsTab ? 'white' : 'black',
                                backgroundColor: isClassroomsTab ? '#0066dd' : '#f1f1f1',
                                fontSize: '14px',
                                fontWeight: '400',
                                padding: '8px 14px',
                                borderRadius: '6px',
                                width: '130px',
                                textAlign: 'center',
                                transition: 'all 0.3s ease',
                            }}
                        >
                            Classrooms
                        </Link>
                    </li>
                    <li style={{ marginRight: '15px' }}>
                        <Link
                            to="/admin/assignments"
                            style={{
                                display: 'block',
                                textDecoration: 'none',
                                color: isAssignmentsTab ? 'white' : 'black',
                                backgroundColor: isAssignmentsTab ? '#0066dd' : '#f1f1f1',
                                fontSize: '14px',
                                fontWeight: '400',
                                padding: '8px 14px',
                                borderRadius: '6px',
                                width: '130px',
                                textAlign: 'center',
                                transition: 'all 0.3s ease',
                            }}
                        >
                            Assignments
                        </Link>
                    </li>
                    <li style={{ marginLeft: 'auto', marginRight: '10px' }}>
                        <button
                            onClick={(e) => { e.preventDefault(); auth.logout(); }}
                            style={{
                                padding: '6px 18px',
                                backgroundColor: '#dd0000',
                                border: 'none',
                                color: 'white',
                                cursor: 'pointer',
                                borderRadius: '6px',
                                fontSize: '13px',
                                fontWeight: '500',
                                transition: 'background-color 0.3s ease',
                            }}
                        >
                            Logout
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => navigate('/preview')}
                            style={{
                                padding: '6px 18px',
                                backgroundColor: '#0066dd',
                                border: 'none',
                                color: 'white',
                                cursor: 'pointer',
                                borderRadius: '6px',
                                fontSize: '13px',
                                fontWeight: '500',
                                transition: 'background-color 0.3s ease',
                            }}
                        >
                            Game Window
                        </button>
                    </li>
                </ul>
            </nav>

            <div style={{ padding: '20px' }}>
                <Routes>
                    <Route path="/" element={<Classrooms />} />
                    <Route path="classroom/*" element={<Classroom />} />
                    <Route path="assignments" element={<Assignments />} />
                    <Route path="assignment/*" element={<Assignment />} />
                    <Route path="student/*" element={<Student />} />
                </Routes>
            </div>
        </div>
    )
}

export default Admin