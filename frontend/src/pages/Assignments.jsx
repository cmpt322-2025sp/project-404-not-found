import React, { useState, useEffect } from 'react'
import bobImage from '../asset/images/bob.png'
import { useAuth } from "../functions/AuthProvider"
import { PROCESSURL } from "../Const"
import { useExpressServices } from "../functions/ExpressServicesProvider"
import { useNavigate } from 'react-router-dom'

const Assignments = () => {
  const navigate = useNavigate()
  const [csrf, setCSRF] = useState('')
  const expressServices = useExpressServices()
  const { userFirstName, userId } = useAuth()
  const [assignments, setAssignments] = useState([])
  const [rowsAreLoading, setRowsAreLoading] = useState(true)
  const [errors, setErrors] = useState({})
  const auth = useAuth()

  useEffect(() => {
    Object.assign(document.body.style, styles.globalReset);
    
		fetch(PROCESSURL + 'csrf', { method: 'GET', credentials: "include" })
			.then((res) => res.json())
			.then((response) => {
				setCSRF(response.csrf)
				return expressServices.retrieveStudentAssignments({csrf:response.csrf, student_id: userId})
			})
			.then((assignmentsData) => {
				if (assignmentsData.error) {
                    setErrors({ server_1: assignmentsData.error })
                }else{
					setAssignments(assignmentsData)
					setRowsAreLoading(false)
				}
			})
			.catch((err) => {
				setErrors({ server_1: err.error })
			})

	}, [])

  return (
    <div style={styles.container}>

        <h2 style={styles.header}>📚 My Assignments 🎮</h2>

        <p style={styles.welcomeText}>Hi there, {userFirstName}! 👋</p>
        <div style={styles.logoutContainer}>
          <button onClick={(e) => { e.preventDefault(); auth.logout() }} style={styles.logoutButton}>🚪 Logout</button>
        </div>

		{errors.server_1 && (
			<p style={{ color: 'red', fontSize: '14px', marginBottom: '15px' }}>
				{errors.server_1}
			</p>
		)}

		{rowsAreLoading ? (
			<p 
				style={styles.loadingText}
		  	>
				Loading...
			</p>
		) : (
			<table style={styles.table}>
				<thead>
				<tr style={styles.tableHeaderRow}>
					<th style={styles.tableHeader}>📜 Assignment</th>
					<th style={styles.tableHeader}>📆 Due Date</th>
					<th style={styles.tableHeader}>🏫 Class</th>
					<th style={styles.tableHeader}>✅ Status</th>
					<th style={styles.tableHeader}>⭐ My Score</th>
					<th style={styles.tableHeader}>🎮 Action</th>
				</tr>
				</thead>
				<tbody>
				{assignments.map((assignment, index) => (
                    <tr key={index} style={styles.tableRow}>
                        <td style={styles.tableCell}>{assignment.name}</td>
                        <td style={styles.tableCell}>
                        {new Date(assignment.due_date).toLocaleString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            timeZone: 'UTC',
                        })}
                        </td>
                        <td style={styles.tableCell}>{assignment.class_name}</td>
                        <td style={styles.tableCell}>{assignment.eggs_collected > 0 ? `${"🥚".repeat(assignment.eggs_collected)}` : 'N/A'}</td>
                        <td style={styles.tableCell}>{Math.round(Object.values(assignment.game_string).reduce((sum, val) => sum + val, 0) / 3)}%</td>
                        <td style={styles.tableCell}>
                          {new Date(assignment.due_date).toISOString().split('T')[0] < new Date().toISOString().split('T')[0] ? (
                            <span style={{ color: 'gray', fontStyle: 'italic' }}>⏰ Past Due</span>
                          ) : (
                            <button
                              style={styles.actionButton}
                              onClick={() => {
                                navigate(`/game?assignment=${assignment.name}&assignmentRef=${assignment._id}&classroom=${assignment.class_id}`);
                              }}
                            >
                             {
                                assignment.eggs_collected === 3
                                  ? '✅ Completed!'
                                  : assignment.eggs_collected > 0
                                    ? '🚀 Resume!'
                                    : '🚀 Start!'
                              }
                              
                            </button>
                          )}
                        </td>
                    </tr>
				))}
				</tbody>
			</table>
	  	)}

      <div style={styles.footer}>
        <img src={bobImage} alt="Bob Character" style={styles.characterImage} />
        <p style={styles.footerText}>🎯 Stay on track and keep learning! 🌟</p>
      </div>
    </div>
  );
};

const styles = {
  globalReset: {
    margin: '0',
    padding: '0',
    boxSizing: 'border-box',
    overflow: 'hidden',
  },
  container: {
    background: 'linear-gradient(120deg, #ff8c00, #00b3b3)',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Comic Sans MS', cursive, sans-serif",
    textAlign: 'center',
  },
  header: {
    fontSize: '2.8em',
    color: '#ff4d4d',
    marginBottom: '20px',
    textShadow: '2px 2px 0px #ffcc00',
    animation: 'bounce 1.5s infinite',
  },
  welcomeText: {
    fontSize: '1.6em',
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: '#ffcc00',
    padding: '8px',
    borderRadius: '10px',
    display: 'inline-block',
  },
  loadingText: {
    fontSize: '2em',
    color: '#ff6347',
    fontFamily: "'Comic Sans MS', cursive, sans-serif",
    textAlign: 'center',
    animation: 'pulse 1.5s infinite',
    background: 'linear-gradient(45deg, #ffb6c1, #ff6347, #ffcc00)',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
  },
  table: {
    margin: '20px auto',
    width: '85%',
    borderCollapse: 'collapse',
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#ffffff',
    animation: 'slideInUp 1.5s ease-in-out',
  },
  tableHeaderRow: {
    backgroundColor: '#66ccff',
  },
  tableHeader: {
    fontSize: '1.3em',
    padding: '14px',
    color: '#fff',
    borderBottom: '3px solid #ffcc00',
  },
  tableRow: {
    transition: 'transform 0.3s ease',
  },
  tableCell: {
    padding: '12px',
    borderBottom: '1px solid #ddd',
    fontSize: '1.2em',
  },
  actionButton: {
    backgroundColor: '#ff4d4d',
    color: '#fff',
    padding: '12px 25px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.1em',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  footer: {
    marginTop: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    animation: 'fadeInUp 1.5s ease-in-out',
  },
  characterImage: {
    width: '180px',
    height: 'auto',
    marginRight: '15px',
  },
  footerText: {
    fontSize: '1.3em',
    color: '#fff',
    fontWeight: 'bold',
  },
  logoutContainer: {
    position: 'absolute',
    top: '20px',
    right: '30px',
  },
  
  logoutButton: {
    backgroundColor: '#ffffff',
    color: '#ff4d4d',
    border: '2px solid #ff4d4d',
    padding: '10px 20px',
    fontSize: '1em',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
  },
};

export default Assignments;
