const { FindDocument } = require("../core/DatabaseFunctions")

const getClassroom = async (req, res) => {
    if(req.headers.origin === process.env.FRONTEND_URL){
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
        const completion_status = await FindDocument('completions', {assignment_id: req.query.assignmentRef, user_id: req.query.user_id}, 'game_string eggs_collected')
        if (!completion_status) {
            res.json({ exists: false })
            return null
        }
        res.json({ exists: true, game_string: completion_status.game_string, eggs_collected: completion_status.eggs_collected })
    }else{
        res.status(403).json({ error: 'Invaid Entry: Origin' });
    }
}

module.exports = getClassroom