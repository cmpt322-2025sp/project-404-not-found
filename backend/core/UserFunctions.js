const { InsertDocument, FindDocument, UpdateDocument } = require("./DatabaseFunctions")
// const crypto = require('crypto');

const loginUser = async (email, password) => {
    const user = await FindDocument('users', {email: email}, 'student_id first_name')
    if(!user) {
        if (email == "admin@bob.com" && password === "admin") {
            return { authenticated: true, admin: true, error: '', user_id: 0, first_name: 'Admin' }
        } else if (email == "admin@bob.com" && password !== "admin") {
            return { authenticated: false, error: 'Admin Password Incorrect' }
        } else {
            return { authenticated: false, error: 'User Not Found' }
        }
    } else {
        if (user.student_id !== password){
            return { authenticated: false, error: 'Incorrect Password' }
        } else {
            return { authenticated: true, admin: false, error: '', user_id: user.student_id, first_name: user.first_name }
        }
    }
}

const createClassroom = async (classroom_name) => {
    if(await FindDocument('classrooms', {name: classroom_name})) return { status: false, error: 'Classroom already exists' }
    const classroom = await InsertDocument('classrooms', {name: classroom_name})
    return classroom ? { status: true, id: classroom } : { status: false, error: 'Classroom creation failed' }
}

const updateStudentsCount = async (classroom_id, change) => {
    let this_class_students = await FindDocument('classrooms', {_id: classroom_id}, {'students_count':1})
    new_num = this_class_students.students_count+change
    const update = await UpdateDocument('classrooms', {_id: classroom_id}, {students_count:new_num})
    return update ? true : false
}

const createStudent = async (student_first_name, student_last_name, student_id, student_email, classroom_id) => {
    if(await FindDocument('users', {student_id: student_id, classroom_id: classroom_id})) return false
    const user = await InsertDocument('users', {first_name: student_first_name, last_name: student_last_name, student_id: student_id, email: student_email, classroom_id: classroom_id})
    return user ? true : false
}

module.exports = {
    loginUser,
    createClassroom,
    updateStudentsCount,
    createStudent,
}