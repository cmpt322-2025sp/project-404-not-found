const { UpdateDocument, FindDocument } = require("../core/DatabaseFunctions")

const postChangeClassroomName = async (req, res) => {
    if(req.headers.origin === process.env.FRONTEND_URL){
            try {
                const classroom = await FindDocument('classrooms', {name: req.body.newClassroomName})
                if (classroom){
                    res.json({ status: false, error: 'Classroom Already Exists' })
                    return null
                }
                await UpdateDocument('classrooms', {_id: req.body.classroomId}, {name: req.body.newClassroomName})
                res.json({ status: true })
                return null
            } catch {
                res.status(500).json({ status: false, error: 'An error occurred while updating classroom name.' })
            }
    }
}

module.exports = postChangeClassroomName