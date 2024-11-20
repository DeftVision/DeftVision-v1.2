const express = require('express');
const router = express.Router();

const { createEmployee, deleteEmployee, getEmployees, getEmployee, updateEmployee } = require('../controllers/employeeController');

router.post('/', createEmployee);

router.get('/', getEmployees);
router.get('/:id', getEmployee);

router.patch('/:id', updateEmployee);

router.delete('/:id', deleteEmployee);


module.exports = router;