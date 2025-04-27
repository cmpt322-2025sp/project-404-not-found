const { FindDocuments, FindDocument, InsertDocument } = require("../core/DatabaseFunctions")

const postRetrieveStudentAssignments = async (req, res) => {
    if(req.headers.origin === process.env.FRONTEND_URL){
        if(req.session.csrf === req.headers.csrf && req.session.csrf === req.body.csrf && req.headers.csrf === req.body.csrf){
            try {
                const this_student = await FindDocuments('users', { student_id: req.body.student_id }, { 'classroom_id': 1 })
                let all_assignments = []
            
                for (const student of this_student) {
                    const assignments = await FindDocuments('assignments', { class_id: student.classroom_id, present_in_view: true }, {})
                    for (const assignment of assignments) {
                        const classroom_name = await FindDocument('classrooms', { _id: assignment.class_id }, {'name':1})
                        const assignment_progress = await FindDocument('completions', {assignment_id: assignment.id, user_id: req.body.student_id}, 'game_string eggs_collected')
                        let game_string, eggs_collected
                        if (assignment_progress) {
                            game_string = assignment_progress.game_string
                            eggs_collected = assignment_progress.eggs_collected
                        } else {
                            await InsertDocument('completions', {assignment_id: assignment.id, user_id: req.body.student_id})
                            game_string = {
                                "Dont Drown Bob": 0,
                                "Grocery Store": 0,
                                "Bob Cleans": 0
                            }
                            eggs_collected = 0
                        }
                        const temp_data = {'_id':assignment._id, 'name':assignment.name, 'class_id':assignment.class_id, 'due_date':assignment.due_date, 'class_name': classroom_name.name, 'game_string': game_string, 'eggs_collected': eggs_collected}
                        all_assignments.push(temp_data)
                    }
                    // all_assignments.push(...assignments)
                }

                // console.log(all_assignments)
            
                res.json({ status: true, assignments: all_assignments })
            } catch (error) {
                res.status(500).json({ status: false, error: 'An error occurred while fetching assignments.' })
            }            
        }
    }
}

module.exports = postRetrieveStudentAssignments