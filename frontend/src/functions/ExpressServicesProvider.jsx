import { useContext, createContext } from "react"
import { PROCESSURL } from "../Const"

const ExpressServicesContext = createContext()

const ExpressServicesProvider = ({ children }) =>{
    
    const createClassroom = (data) => {
        return fetch(PROCESSURL + 'create_classroom', { 
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                csrf: data.csrf
            },
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
            headers: {
                'Content-Type': 'application/json',
                csrf: data.csrf
            },
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
            headers: {
                'Content-Type': 'application/json',
                csrf: data.csrf
            },
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
            headers: {
                'Content-Type': 'application/json',
                csrf: data.csrf
            },
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
            headers: {
                'Content-Type': 'application/json',
                csrf: data.csrf
            },
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

    const addStudent = (data) => {
        return fetch(PROCESSURL + 'add_student', { 
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                csrf: data.csrf
            },
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
            headers: {
                'Content-Type': 'application/json',
                csrf: data.csrf
            },
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
            headers: {
                'Content-Type': 'application/json',
                csrf: data.csrf
            },
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
            headers: {
                'Content-Type': 'application/json',
                csrf: data.csrf
            },
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
            headers: {
                'Content-Type': 'application/json',
                csrf: data.csrf
            },
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
            autoSaveProgress
        }}>{children}</ExpressServicesContext.Provider>
    );

}

export default ExpressServicesProvider

export const useExpressServices = () => {
    return useContext(ExpressServicesContext)
}