const { FindDocument } = require("../core/DatabaseFunctions")

const getAssignment = async (req, res) => {
    if(req.headers.origin === process.env.FRONTEND_URL){
        const assignment = await FindDocument('assignments', {name: req.query.assignmentName, _id: req.query.assignment})
        if(assignment){
            res.json({ exists: true })
        }else{
            res.json({ exists: false })
        }
    }else{
        res.status(403).json({ error: 'Invaid Entry: Origin' });
    }
}

module.exports = getAssignment