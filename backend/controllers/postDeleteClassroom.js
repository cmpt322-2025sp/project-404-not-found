const { DeleteDocument } = require("../core/DatabaseFunctions")

const postDeleteClassroom = async (req, res) => {
    if(req.headers['sec-fetch-site'] === 'same-site'){
        if(req.session.csrf === req.headers.csrf && req.session.csrf === req.body.csrf && req.headers.csrf === req.body.csrf){
            try {
                await DeleteDocument('classrooms', {_id: req.body.classroomId})
                return res.json({ status: true })
            } catch (err) {
                return res.json({ status: false, error: 'Failed to delete classrooms' })
            }
        }
    }
}

module.exports = postDeleteClassroom