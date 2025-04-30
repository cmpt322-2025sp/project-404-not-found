const { DeleteDocument, DeleteDocuments } = require("../core/DatabaseFunctions")

const postDeleteAssignment = async (req, res) => {
    if(req.headers.origin === process.env.FRONTEND_URL){
            try {
                await DeleteDocuments('completions', {assignment_id: req.body.assignmentId})
                await DeleteDocument('assignments', {_id: req.body.assignmentId})
                return res.json({ status: true })
            } catch (err) {
                return res.json({ status: false, error: 'Failed to delete assignment' })
            }
    }
}

module.exports = postDeleteAssignment