const { FindDocuments, FindDocument, InsertDocument } = require("../core/DatabaseFunctions")

const postRetrieveStudentRecords = async (req, res) => {
    if(req.headers['sec-fetch-site'] === 'same-site'){
        if(req.session.csrf === req.headers.csrf && req.session.csrf === req.body.csrf && req.headers.csrf === req.body.csrf){
            try {
                const this_student = await FindDocument('users', {student_id: req.body.student_id, classroom_id: req.body.class_id}, {})
                const assignments = await FindDocuments('assignments', {class_id: req.body.class_id}, {})
                let records = []
                for (const assignment of assignments) {
                    const progress = await FindDocument('completions', {assignment_id: assignment._id, user_id: req.body.student_id}, {})
                    if(progress){
                        records.push(
                            {
                                assignment_name: assignment.name,
                                game_string: progress.game_string,
                                eggs_collected: progress.eggs_collected,
                                assigned_date: assignment.createdAt,
                                completion_date: progress.updatedAt
                            }
                        )
                    } else {
                        records.push(
                            {
                                assignment_name: assignment.name,
                                game_string: null,
                                eggs_collected: 0,
                                assigned_date: assignment.createdAt,
                                completion_date: null
                            }
                        )
                    }
                }
                res.json({ status: true, assignmentRecords: records, studentInfo: this_student })
            } catch (error) {
                res.status(500).json({ status: false, error: 'An error occurred while fetching records.' })
            } 

        }
    }
}

module.exports = postRetrieveStudentRecords