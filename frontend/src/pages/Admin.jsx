import { useState } from "react"
import { Link, Route, Routes, useNavigate } from "react-router-dom"
import { useAuth } from "../functions/AuthProvider"

import Classrooms from "./admin/Classrooms"
import Assignments from "./admin/Assignments"
import Games from "./admin/Games"

const Admin = () => {
    const navigate = useNavigate()
    const auth = useAuth()

    const [activeTab, setActiveTab] = useState('Classrooms')

    return (
        <div>
            <nav style={{ backgroundColor: '#f8f9fa', padding: '10px' }}>
                <ul style={{ display: 'flex', listStyle: 'none', padding: 0 }}>
                    <li style={{ marginRight: '20px' }}>
                        <Link
                            to="/admin/"
                            onClick={() => setActiveTab('Classrooms')}
                            style={{ textDecoration: 'none', color: activeTab === 'Classrooms' ? 'blue' : 'black' }}
                        >
                            Classrooms
                        </Link>
                    </li>
                    <li style={{ marginRight: '20px' }}>
                        <Link
                            to="/admin/assignments"
                            onClick={() => setActiveTab('Assignments')}
                            style={{ textDecoration: 'none', color: activeTab === 'Assignments' ? 'blue' : 'black' }}
                        >
                            Assignments
                        </Link>
                    </li>
                    <li style={{ marginRight: '20px' }}>
                        <Link
                            to="/admin/games"
                            onClick={() => setActiveTab('Games')}
                            style={{ textDecoration: 'none', color: activeTab === 'Games' ? 'blue' : 'black' }}
                        >
                            Games
                        </Link>
                    </li>
                    <li style={{ marginLeft: 'auto' }}>
                        <button onClick={(e) => { e.preventDefault(); auth.logout() }} style={{ padding: '5px 10px', cursor: 'pointer' }}>
                            Logout
                        </button>
                    </li>
                    <li>
                        <button onClick={() => {navigate('/game')}} style={{ padding: '5px 10px', cursor: 'pointer' }}>
                            Game Window
                        </button>
                    </li>
                </ul>
            </nav>

            <div style={{ padding: '20px' }}>
                <Routes>
                    <Route path="/" element={<Classrooms />} />
                    <Route path="assignments" element={<Assignments />} />
                    <Route path="games" element={<Games />} />
                </Routes>
            </div>
        </div>
    )
}

export default Admin