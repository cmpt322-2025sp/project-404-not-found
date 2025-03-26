const router = require('express').Router()
const controller = require('../controllers')

router.get('/csrf',controller.getCSRF)
router.get('/muffin/:crumble',controller.getMuffin)
router.post('/login',controller.postLogin)
router.get('/logout',controller.getLogout)

module.exports = router;