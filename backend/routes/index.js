const router = require('express').Router()
const controller = require('../controllers')

router.get('/csrf',controller.getCSRF)
router.get('/muffin/:crumble',controller.getMuffin)
router.post('/login',controller.postLogin)
router.get('/logout',controller.getLogout)
router.get('/check_classroom_exists',controller.getClassroom)
router.post('/create_classroom',controller.postCreateClassroom)
router.post('/retrieve_classrooms',controller.postRetrieveClassrooms)
router.post('/delete_classroom',controller.postDeleteClassroom)
router.post('/upload_classroom_csv',controller.postUploadClassroomCSV)
router.post('/retrieve_students',controller.postRetrieveStudents)
router.post('/add_student',controller.postAddStudent)
router.post('/create_assignment',controller.postCreateAssignment)
router.post('/retrieve_assignments',controller.postRetrieveAssignments)
router.get('/check_assignment_exists',controller.getAssignment)

module.exports = router;