const router = require('express').Router();
const userCtrl = require('../controllers/userCtrl');

router.post('/create', userCtrl.createUser);

router.get('/gets', userCtrl.getUsers);

router.get('/get/:id', userCtrl.getUser)

router.put('/update/:id', userCtrl.updateUser);

router.delete('/delete/:id', userCtrl.deleteUser);


module.exports = router;
