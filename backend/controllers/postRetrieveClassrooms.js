const { FindDocuments } = require("../core/DatabaseFunctions")

const postRetrieveClassrooms = async (req, res) => {
    if(req.headers.origin === process.env.FRONTEND_URL){
            try {
                const classrooms = await FindDocuments('classrooms', {}, {'name':1, 'students_count': 1}, {name: 1})
                return res.json({ status: true, classrooms })
            } catch (err) {
                return res.json({ status: false, error: 'Failed to retrieve classrooms' })
            }
    }
}

module.exports = postRetrieveClassrooms