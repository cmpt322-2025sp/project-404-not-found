const router = require('express').Router()
const controller = require('../controllers')

router.get('/csrf',controller.getCSRF)
router.get('/muffin/:crumble',controller.getMuffin)
router.post('/login',controller.postLogin)
router.get('/logout',controller.getLogout)
router.post('/create_classroom',controller.postCreateClassroom)
router.post('/retrieve_classrooms',controller.postRetrieveClassrooms)
router.post('/delete_classroom',controller.postDeleteClassroom)
router.post('/upload_classroom_csv',controller.postUploadClassroomCSV)
router.post('/retrieve_students',controller.postRetrieveStudents)

module.exports = router;