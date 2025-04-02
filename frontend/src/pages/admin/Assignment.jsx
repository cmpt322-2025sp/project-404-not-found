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

    useEffect(() => {
        fetch(PROCESSURL + 'check_assignment_exists?'+queryParams, { method: 'GET', credentials: "include" })
            .then((res) => res.json())
            .then((assignment) => {
                if(!assignment.exists){
                    navigate('/page_not_found')
                }
            })
    }, [navigate])

    return (
        <div>
            <h2>Assignments / {assignmentName}</h2>
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

export default Assignment