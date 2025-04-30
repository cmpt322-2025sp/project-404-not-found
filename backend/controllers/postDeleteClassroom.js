const { DeleteDocument, FindDocuments } = require("../core/DatabaseFunctions")

const postDeleteClassroom = async (req, res) => {
    if(req.headers.origin === process.env.FRONTEND_URL){
            try {
                const classroom_assignments = await FindDocuments('assignments', {class_id: req.body.classroomId})
                for (const assignment of classroom_assignments) {
                    await DeleteDocument('assignments', {_id: assignment._id})
                }
                await DeleteDocument('classrooms', {_id: req.body.classroomId})
                return res.json({ status: true })
            } catch (err) {
                return res.json({ status: false, error: 'Failed to delete classrooms' })
            }
    }
}

module.exports = postDeleteClassroom