const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/', brandController.create)
router.get('/', brandController.getAll)
router.delete('/:id', brandController.delete)


module.exports = router
