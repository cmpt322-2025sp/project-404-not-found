const { FindDocuments } = require("../core/DatabaseFunctions")

const postRetrieveAssignments = async (req, res) => {
    if(req.headers['sec-fetch-site'] === 'same-site'){
        if(req.session.csrf === req.headers.csrf && req.session.csrf === req.body.csrf && req.headers.csrf === req.body.csrf){
            try {
                const assignments = await FindDocuments('assignments', { present_in_view: true }, { 'name': 1, 'due_date': 1, 'class_id': 1 });
            
                const assignmentsWithClassroom = await Promise.all(assignments.map(async (assignment) => {
                    const classroom = await FindDocuments('classrooms', { _id: assignment.class_id }, { 'classroom_name': 1 })
                    if (classroom.length > 0) {
                        assignment.classroom_name = classroom[0].classroom_name;
                    } else {
                        assignment.classroom_name = 'Unknown';
                    }
                    return assignment
                }))
            
                return res.json({ status: true, assignments: assignmentsWithClassroom })
            
            } catch (err) {
                return res.json({ status: false, error: 'Failed to retrieve assignments' });
            }            
        }
    }
}

module.exports = postRetrieveAssignments