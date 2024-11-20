const employeeModel = require("../models/employeeModel");



exports.getEmployees = async (req, res) => {
    try {
        const employees = await employeeModel.find({})
        if(!employees) {
            return res.status(404).json({ message: "No employees found" });
        }
        return res.status(200).send({
            employeeCount: employees.length,
            employees,
        })
    } catch (error) {
        console.error('server get error', error);
        return res.status(500).send({
            message: "Error getting users",
            error,
        })
    }
}

exports.getEmployee = async (req, res) => {
    try {
        const employee = await employeeModel.findById(req.params.id);
        if(!employee) {
            return res.status(404).json({ message: "Employee not found" });
        } else {
            return res.status(200).send({
                employee
            })
        }
    } catch (error) {
        console.error('server get error', error)
        return res.status(500).send({
            message: 'Error getting user',
            error,
        })
    }
}

exports.createEmployee = async (req, res) => {
    try {
        const {employeeId, firstName, lastName, location, role, phone, notes, isActive } = req.body;
        if(!employeeId || !firstName || !lastName || !location || !role) {
            return res.status(400).send({
                message: "Missing required fields"
            })
        }

        const existingEmployee = await employeeModel.findOne({ employeeId })
        if(existingEmployee) {
            return res.status(400).send({
                message: "Employee with the same ID already exists"
            })
        }

        const employee = new employeeModel({employeeId, firstName, lastName, location, role, phone, notes, isActive});
        await employee.save();
        return res.status(201).send({ message: "Employee saved successfully", employee });
    } catch (error) {
        console.error('server posting error', error)
        return res.status(500).send({
            message: 'Error getting user',
            error,
        })
    }
}

exports.updateEmployee = async (req, res) => {
    try {
        const {id} = req.params;
        const {employeeId, firstName, lastName, location, role, phone, notes, isActive} = req.body;
        const employee = await employeeModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        } else {
            return res.status(200).send({ message: "Employee updated successfully", employee });
        }

    } catch (error) {
        console.error('server updating error', error)
        return res.status(500).send({
            message: 'Error getting user',
            error,
        })
    }
}

exports.deleteEmployee = async (req, res) => {
    try {
    const {id} = req.params;
    const employee = await employeeModel.findByIdAndDelete(id);
    if(!employee) {
        return res.status(404).json({ message: "Employee not found" });
    }else {
        return res.status(200).send({
            message: 'Employee deleted successfully',
            employee,
        })
    }
    } catch (error) {
        console.error('server deleting error', error)
        return res.status(500).send({
            message: 'Error getting user',
            error,
        })
    }
}