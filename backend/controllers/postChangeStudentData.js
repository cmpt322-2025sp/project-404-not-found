const { UpdateDocuments, FindDocument } = require("../core/DatabaseFunctions")

const postChangeStudentData = async (req, res) => {
    if(req.headers['sec-fetch-site'] === 'same-site'){
        if(req.session.csrf === req.headers.csrf && req.session.csrf === req.body.csrf && req.headers.csrf === req.body.csrf){
            try {
                const student = await FindDocument('users', {student_id: req.body.student_id})
                if (!student){
                    res.json({ status: false, error: 'Student Not Found' })
                    return null
                }
                await UpdateDocuments('users', {student_id: req.body.student_id}, {first_name: req.body.first_name, last_name: req.body.last_name})
                res.json({ status: true })
                return null
            } catch {
                res.status(500).json({ status: false, error: 'An error occurred while updating student.' })
            }
        }
    }
}

module.exports = postChangeStudentData