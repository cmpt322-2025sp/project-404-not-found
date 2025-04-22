const { FindDocuments, FindDocument } = require("../core/DatabaseFunctions")

const postRetrieveCompletionsForAssignment = async (req, res) => {
    if(req.headers['sec-fetch-site'] === 'same-site'){
        if(req.session.csrf === req.headers.csrf && req.session.csrf === req.body.csrf && req.headers.csrf === req.body.csrf){
            try {
                const this_assignment = await FindDocument('assignments', {_id: req.body.assignment_id}, {})
                const all_users = await FindDocuments('users', {classroom_id: this_assignment.class_id}, {}, {first_name: 1})
                const this_class = await FindDocument('classrooms', {_id: this_assignment.class_id}, {})
                let all_completions = []

                const assignment_info = {
                    name: this_assignment.name,
                    due_date: this_assignment.due_date,
                    class: this_class.name,
                    class_id: this_class._id,
                    created_on: this_assignment.createdAt
                }

                for (const student of all_users) {
                    const completion = await FindDocument('completions', {assignment_id: req.body.assignment_id, user_id: student.student_id}, {})
                    if (completion) {
                        all_completions.push(
                            {
                                first_name: student.first_name,
                                last_name: student.last_name,
                                student_id: student.student_id,
                                has_viewed: true,
                                game_string: completion.game_string,
                                eggs_collected: completion.eggs_collected,
                                last_login: student.last_login
                            }
                        )
                    } else {
                        all_completions.push(
                            {
                                first_name: student.first_name,
                                last_name: student.last_name,
                                student_id: student.student_id,
                                has_viewed: false,
                                game_string: null,
                                eggs_collected: 0,
                                last_login: student.last_login
                            }
                        )
                    }
                }
                return res.json({ status: true, completions: all_completions, assignment_info: assignment_info })
            } catch (err) {
                return res.json({ status: false, error: 'Failed to retrieve assignment completions' })
            }
        }
    }
}

module.exports = postRetrieveCompletionsForAssignment