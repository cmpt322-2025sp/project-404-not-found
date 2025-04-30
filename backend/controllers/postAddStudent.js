const UserFunctions = require("../core/UserFunctions")

const postAddStudent = async (req, res) => {
    if(req.headers.origin === process.env.FRONTEND_URL){
            if (
                !req.body.last_name || 
                !req.body.first_name || 
                !req.body.student_id || 
                !req.body.email ||
                !req.body.classroomId ||
                !req.body.last_name.trim() || 
                !req.body.first_name.trim() || 
                !req.body.student_id.trim() ||
                !req.body.email.trim() ||
                !req.body.classroomId.trim()
            ) {
                return res.json({ status: false, error: 'Missing Required Field' })
            }

            const student = await UserFunctions.createStudent(req.body.first_name, req.body.last_name, req.body.student_id, req.body.email, req.body.classroomId)

            if(student){
                UserFunctions.updateStudentsCount(req.body.classroomId, 1)
                return res.json({ status: true })
            } else {
                return res.json({ status: false, error: 'Student Already Exists' })
            }
    }
}

module.exports = postAddStudent