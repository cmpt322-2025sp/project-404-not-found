const router = require('express').Router();
const controller = require('../controllers');
const { authenticateToken } = require('../middleware');

router.post('/login', controller.postLogin);

router.get('/muffin/:crumble', authenticateToken, controller.getMuffin);
router.get('/check_classroom_exists', authenticateToken, controller.getClassroom);
router.get('/check_student_exists', authenticateToken, controller.getStudent);
router.post('/create_classroom', authenticateToken, controller.postCreateClassroom);
router.post('/retrieve_classrooms', authenticateToken, controller.postRetrieveClassrooms);
router.post('/delete_classroom', authenticateToken, controller.postDeleteClassroom);
router.post('/upload_classroom_csv', authenticateToken, controller.postUploadClassroomCSV);
router.post('/retrieve_students', authenticateToken, controller.postRetrieveStudents);
router.post('/add_student', authenticateToken, controller.postAddStudent);
router.post('/create_assignment', authenticateToken, controller.postCreateAssignment);
router.post('/retrieve_assignments', authenticateToken, controller.postRetrieveAssignments);
router.get('/check_assignment_exists', authenticateToken, controller.getAssignment);
router.post('/retrieve_student_assignments', authenticateToken, controller.postRetrieveStudentAssignments);
router.get('/check_assignment_exists_for_student', authenticateToken, controller.getAssignmentExists);
router.post('/auto_save_progress', authenticateToken, controller.postAutoSaveProgress);
router.post('/retrieve_completions_for_assignment', authenticateToken, controller.postRetrieveCompletionsForAssignment);
router.post('/change_due_date', authenticateToken, controller.postChangeAssignmentDue);
router.post('/delete_assignment', authenticateToken, controller.postDeleteAssignment);
router.post('/change_classroom_name', authenticateToken, controller.postChangeClassroomName);
router.post('/change_student_data', authenticateToken, controller.postChangeStudentData);
router.post('/delete_student', authenticateToken, controller.postDeleteStudent);
router.post('/retrieve_student_records', authenticateToken, controller.postRetrieveStudentRecords);

module.exports = router;