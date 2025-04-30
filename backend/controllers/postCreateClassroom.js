const UserFunctions = require("../core/UserFunctions")

const postCreateClassroom = async (req, res) => {
    if(req.headers.origin === process.env.FRONTEND_URL){
            creation = await UserFunctions.createClassroom(req.body.classroomName)
            if(creation.status === true){
                res.json({ status: true, error: false })
            }else{
                res.json({status: false, error: creation.error})
            }
    }
}

module.exports = postCreateClassroom