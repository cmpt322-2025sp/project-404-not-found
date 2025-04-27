const { DeleteDocument, FindDocument, FindDocuments } = require("../core/DatabaseFunctions")
const UserFunctions = require("../core/UserFunctions")

const postDeleteAssignment = async (req, res) => {
    if(req.headers.origin === process.env.FRONTEND_URL){
            try {
                const student = await FindDocument('users', {student_id: req.body.student_id, classroom_id: req.body.classroom_id})
                if(!student){
                    return res.json({ status: false, error: 'Failed to delete student' })
                }
                const classroom_assignments = await FindDocuments('assignments', {class_id: req.body.classroom_id})

                for (const assignment of classroom_assignments) {
                    await DeleteDocument('completions', {assignment_id: assignment._id, user_id: req.body.student_id})
                }

                await DeleteDocument('users', {student_id: req.body.student_id, classroom_id: req.body.classroom_id})
                UserFunctions.updateStudentsCount(req.body.classroom_id, -1)

                return res.json({ status: true })
            } catch (err) {
                return res.json({ status: false, error: 'Failed to delete student' })
            }
    }
}

module.exports = postDeleteAssignment