const UserFunctions = require("../core/UserFunctions")

const postCreateAssignment = async (req, res) => {
    if(req.headers.origin === process.env.FRONTEND_URL){
        if(req.session.csrf === req.headers.csrf && req.session.csrf === req.body.csrf && req.headers.csrf === req.body.csrf){
            if (
                !req.body.assignmentName || 
                !req.body.assignmentDue || 
                !req.body.assignmentClass || 
                !req.body.assignmentName.trim() || 
                !req.body.assignmentDue.trim() || 
                !req.body.assignmentClass.trim()
            ) {
                return res.json({ status: false, error: 'Missing Required Field' })
            }

            creation = await UserFunctions.createAssignment(req.body.assignmentName, req.body.assignmentClass, req.body.assignmentDue)
            if(creation.status === true){
                res.json({ status: true, error: false })
            }else{
                res.json({status: false, error: creation.error})
            }
        }
    }
}

module.exports = postCreateAssignment