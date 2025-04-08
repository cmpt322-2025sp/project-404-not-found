const UserFunctions = require("../core/UserFunctions")

const postCreateClassroom = async (req, res) => {
    if(req.headers['sec-fetch-site'] === 'same-site'){
        if(req.session.csrf === req.headers.csrf && req.session.csrf === req.body.csrf && req.headers.csrf === req.body.csrf){
            creation = await UserFunctions.createClassroom(req.body.classroomName)
            if(creation.status === true){
                res.json({ status: true, error: false })
            }else{
                res.json({status: false, error: creation.error})
            }
        }
    }
}

module.exports = postCreateClassroom