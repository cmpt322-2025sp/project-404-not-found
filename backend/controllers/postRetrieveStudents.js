const { FindDocuments } = require("../core/DatabaseFunctions")

const postRetrieveStudents = async (req, res) => {
    if(req.headers['sec-fetch-site'] === 'same-site'){
        if(req.session.csrf === req.headers.csrf && req.session.csrf === req.body.csrf && req.headers.csrf === req.body.csrf){
            try {
                const students = await FindDocuments('users', {classroom_id: req.body.classroomId}, {'first_name':1, 'last_name': 1, 'student_id': 1, 'email': 1, 'last_login': 1})
                return res.json({ status: true, students })
            } catch (err) {
                return res.json({ status: false, error: 'Failed to retrieve classrooms' })
            }
        }
    }
}

module.exports = postRetrieveStudents