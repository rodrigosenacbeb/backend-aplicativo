/* ### NESSE ARQUIVO FICA TODAS AS ROTAS DE TAREFA DA NOSSA API ### */

const express = require('express');
const router = express.Router();

const TaskControllers = require('../controllers/TaskControllers');
const TaskValidation = require('../middlewares/TaskValidation');

router.post('/', TaskValidation, TaskControllers.create);
router.get('/filter/all', TaskControllers.all);
router.get('/:id', TaskControllers.show);
router.put('/:id', TaskValidation, TaskControllers.update);
router.delete('/:id', TaskControllers.delete);
router.put('/done/:id/:done', TaskControllers.done);
router.get('/filter/today', TaskControllers.today);
router.get('/filter/week', TaskControllers.week);
router.get('/filter/month', TaskControllers.month);
router.get('/filter/year', TaskControllers.year);
router.get('/filter/late', TaskControllers.late);

module.exports = router;


