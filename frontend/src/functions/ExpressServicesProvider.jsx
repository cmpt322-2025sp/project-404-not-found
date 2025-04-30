import { useContext, createContext } from "react"
import { PROCESSURL } from "../Const"

const getAuthHeaders = () => {
    const token = localStorage.getItem('token')
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    }
}

const ExpressServicesContext = createContext()

const ExpressServicesProvider = ({ children }) =>{
    
    const createClassroom = (data) => {
        return fetch(PROCESSURL + 'create_classroom', { 
            method: "POST",
            credentials: "include",
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then((response) => {
            if(response.status === true){
                return true
            }else{
                return JSON.stringify(response)
            }
        })
    }

    const retrieveClassrooms = (data) => {
        return fetch(PROCESSURL + 'retrieve_classrooms', { 
            method: "POST",
            credentials: "include",
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then((response) => {
            if(response.status === true){
                return response.classrooms
            }else{
                return JSON.stringify(response)
            }
        })
    }

    const deleteClassroom = (data) => {
        return fetch(PROCESSURL + 'delete_classroom', { 
            method: "POST",
            credentials: "include",
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then((response) => {
            if(response.status === true){
                return true
            }else{
                return false
            }
        })
    }

    const uploadClassroomCSV = (data) => {
        return fetch(PROCESSURL + 'upload_classroom_csv', {
            method: 'POST',
            credentials: "include",
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then((response) => {
            if(response.status === true){
                return response.students
            }else{
                return JSON.stringify(response)
            }
        })
    }

    const retrieveStudents = (data) => {
        return fetch(PROCESSURL + 'retrieve_students', { 
            method: "POST",
            credentials: "include",
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then((response) => {
            if(response.status === true){
                return {students: response.students, classroom: response.classroom}
            }else{
                return JSON.stringify(response)
            }
        })
    }

    const addStudent = (data) => {
        return fetch(PROCESSURL + 'add_student', { 
            method: "POST",
            credentials: "include",
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then((response) => {
            if(response.status === true){
                return {status: true}
            }else{
                return response
            }
        })
    }

    const createAssignment = (data) => {
        return fetch(PROCESSURL + 'create_assignment', { 
            method: "POST",
            credentials: "include",
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then((response) => {
            if(response.status === true){
                return {status: true}
            }else{
                return JSON.stringify(response)
            }
        })
    }

    const retrieveAssignments = (data) => {
        return fetch(PROCESSURL + 'retrieve_assignments', { 
            method: "POST",
            credentials: "include",
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then((response) => {
            if(response.status === true){
                return response.assignments
            }else{
                return JSON.stringify(response)
            }
        })
    }

    const retrieveStudentAssignments = (data) => {
        return fetch(PROCESSURL + 'retrieve_student_assignments', { 
            method: "POST",
            credentials: "include",
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then((response) => {
            if(response.status === true){
                return response.assignments
            }else{
                return JSON.stringify(response)
            }
        })
    }

    const autoSaveProgress = (data) => {
        return fetch(PROCESSURL + 'auto_save_progress', {
            method: "POST",
            credentials: "include",
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then((response) => {
            if(response.status === true){
                return {status: true}
            }else{
                return {status: false}
            }
        })
    }

    const retrieveAssignmentCompletions = (data) => {
        return fetch(PROCESSURL + 'retrieve_completions_for_assignment', {
            method: "POST",
            credentials: "include",
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then((response) => {
            if(response.status === true){
                return {completions: response.completions, assignment_info: response.assignment_info}
            }else{
                return JSON.stringify(response)
            }
        })
    }

    const changeAssignmentDueDate = (data) => {
        return fetch(PROCESSURL + 'change_due_date', {
            method: "POST",
            credentials: "include",
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then((response) => {
            if(response.status === true){
                return {status: true}
            }else{
                return JSON.stringify(response)
            }
        })
    }

    const deleteAssignment = (data) => {
        return fetch(PROCESSURL + 'delete_assignment', {
            method: "POST",
            credentials: "include",
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then((response) => {
            if(response.status === true){
                return true
            }else{
                return false
            }
        })
    }

    const changeClassroomName = (data) => {
        return fetch(PROCESSURL + 'change_classroom_name', { 
            method: "POST",
            credentials: "include",
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then((response) => {
            if(response.status === true){
                return true
            }else{
                return JSON.stringify(response)
            }
        })
    }

    const changeStudentData = (data) => {
        return fetch(PROCESSURL + 'change_student_data', { 
            method: "POST",
            credentials: "include",
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then((response) => {
            if(response.status === true){
                return true
            }else{
                return JSON.stringify(response)
            }
        })
    }

    const deleteStudent = (data) => {
        return fetch(PROCESSURL + 'delete_student', {
            method: "POST",
            credentials: "include",
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then((response) => {
            if(response.status === true){
                return true
            }else{
                return false
            }
        })
    }

    const retrieveStudentRecords = (data) => {
        return fetch(PROCESSURL + 'retrieve_student_records', {
            method: "POST",
            credentials: "include",
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then((response) => {
            if(response.status === true){
                return {assignmentRecords: response.assignmentRecords, studentInfo: response.studentInfo}
            }else{
                return JSON.stringify(response)
            }
        })
    }

    return (
        <ExpressServicesContext.Provider value={{ 
            createClassroom, 
            retrieveClassrooms, 
            uploadClassroomCSV, 
            retrieveStudents, 
            deleteClassroom, 
            addStudent,
            createAssignment,
            retrieveAssignments,
            retrieveStudentAssignments,
            autoSaveProgress,
            retrieveAssignmentCompletions,
            changeAssignmentDueDate,
            deleteAssignment,
            changeClassroomName,
            changeStudentData,
            deleteStudent,
            retrieveStudentRecords
        }}>{children}</ExpressServicesContext.Provider>
    );

}

export default ExpressServicesProvider

export const useExpressServices = () => {
    return useContext(ExpressServicesContext)
}