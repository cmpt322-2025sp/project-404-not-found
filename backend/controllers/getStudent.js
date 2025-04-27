const { FindDocument } = require("../core/DatabaseFunctions")

const getStudent = async (req, res) => {
    if(req.headers.origin === process.env.FRONTEND_URL){
        const student = await FindDocument('users', {classroom_id: req.query.classroom, student_id: req.query.student, first_name: req.query.studentFN, last_name: req.query.studentLN})
        if(student){
            res.json({ exists: true })
        }else{
            res.json({ exists: false })
        }
    }else{
        res.status(403).json({ error: 'Invaid Entry: Origin' });
    }
}

module.exports = getStudent