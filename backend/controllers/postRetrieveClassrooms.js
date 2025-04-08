const { FindDocuments } = require("../core/DatabaseFunctions")

const postRetrieveClassrooms = async (req, res) => {
    if(req.headers['sec-fetch-site'] === 'same-site'){
        if(req.session.csrf === req.headers.csrf && req.session.csrf === req.body.csrf && req.headers.csrf === req.body.csrf){
            try {
                const classrooms = await FindDocuments('classrooms', {}, {'name':1, 'students_count': 1})
                return res.json({ status: true, classrooms })
            } catch (err) {
                return res.json({ status: false, error: 'Failed to retrieve classrooms' })
            }
        }
    }
}

module.exports = postRetrieveClassrooms