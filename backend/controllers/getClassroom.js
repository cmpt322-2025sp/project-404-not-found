const { FindDocument } = require("../core/DatabaseFunctions")

const getClassroom = async (req, res) => {
    if(req.headers.origin === process.env.FRONTEND_URL){
        const classroom = await FindDocument('classrooms', {name: req.query.classroomName, _id: req.query.classroom})
        if(classroom){
            res.json({ exists: true })
        }else{
            res.json({ exists: false })
        }
    }else{
        res.status(403).json({ error: 'Invaid Entry: Origin' });
    }
}

module.exports = getClassroom