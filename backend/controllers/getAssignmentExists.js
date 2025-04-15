const { FindDocument } = require("../core/DatabaseFunctions")

const getClassroom = async (req, res) => {
    if(req.headers['sec-fetch-site'] === 'same-site'){
        const user_in_classroom = await FindDocument('users', {student_id: req.query.user_id, classroom_id: req.query.classroom})
        if(!user_in_classroom){
            res.json({ exists: false })
            return null
        }
        const classroom_has_assignment = await FindDocument('assignments', {_id: req.query.assignmentRef, class_id: req.query.classroom}, {})
        if(!classroom_has_assignment){
            res.json({ exists: false })
            return null
        }
        if (new Date(new Date(classroom_has_assignment.due_date).setDate(new Date(classroom_has_assignment.due_date).getDate() + 1)) < new Date()){
            return res.json({ exists: false });
        } 
        res.json({ exists: true })
    }else{
        res.status(403).json({ error: 'Invaid Entry' });
    }
}

module.exports = getClassroom