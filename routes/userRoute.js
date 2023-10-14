const {Router} = require("express");
const router = Router()
const {signup, login} = require("../controllers/authControllers")

router.post('/register', signup)
router.post('/login', login)

module.exports = router;