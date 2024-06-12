const db = require("../db");
const Student = db.student;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registration
exports.create = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(400).send({ message: 'Student already exists' });
        }
        const student = new Student({ name, email, password });
        await student.save();

        res.status(201).send({ message: 'Student registered successfully' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const student = await Student.findOne({ email });
        if (!student) {
            return res.status(400).send({ message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(400).send({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ studentId: student._id }, 'one', { expiresIn: '24h' });
    res.cookie('token', token);

    res.status(200).send({ message: 'Login successful', token, studentId: student._id });
  
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Update student
exports.updateStudent = async (req, res) => {
    try {
        const { name, email, password } = req.body;
       // const studentId = req.body.studentId;
        const studentId = req.student.studentId || req.body.studentId;

        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).send({ message: 'Student not found' });
        }

        // Update student fields
        if (name) student.name = name;
        if (email) student.email = email;
        if (password) student.password = password;

        await student.save();

        res.status(200).send({ message: 'Student updated successfully' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Delete

exports.delete = async (req, res) => {
    try {
       // const studentId = req.params.iduu;
        const deleteStudentId = req.body.id;
      //  return res.status(404).send({ 'dd': deleteStudentId });

        const deleteStudent = await Student.findById(deleteStudentId);
        if (!deleteStudent) {
            return res.status(404).send({ message: 'Student not found' });
        }
        await Student.deleteOne({ _id: deleteStudentId });
        res.status(200).send({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
