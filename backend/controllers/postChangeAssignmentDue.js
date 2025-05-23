const { UpdateDocument, FindDocument } = require("../core/DatabaseFunctions")

const postChangeAssignmentDue = async (req, res) => {
    if(req.headers.origin === process.env.FRONTEND_URL){
            try {
                await UpdateDocument('assignments', {_id: req.body.assignment_id}, {due_date: req.body.assignmentDue})
                res.json({ status: true })
                return null
            } catch {
                res.status(500).json({ status: false, error: 'An error occurred while updating due date.' })
            }
    }
}

module.exports = postChangeAssignmentDue