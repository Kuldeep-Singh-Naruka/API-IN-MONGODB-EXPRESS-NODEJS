const db = require("../db");
const Teacher = db.teacher;

// Create
exports.create = async (req, res) => {
    try {
        const { name, subject, classes } = req.body;
        const existingTeacher = await Teacher.findOne({ name, subject });
        if (existingTeacher) {
            return res.status(400).send({ message: 'Teacher already exists' });
        }
        const teacher = new Teacher({ name, subject, classes });
        await teacher.save();

        res.status(201).send({ message: 'Teacher registered successfully' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// find all teachers
exports.allTeacher = async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.status(200).send(teachers);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Delete teacher
exports.delete = async (req, res) => {
    try {
        const { id } = req.body;
        const teacher = await Teacher.findById(id);
        if (!teacher) {
            return res.status(404).send({ message: 'Teacher not found' });
        }
        await Teacher.deleteOne({ _id: id });

        res.status(200).send({ message: 'Teacher deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Update
exports.updateTeacher = async (req, res) => {
    try {
        const { id, name, subject, classes } = req.body;
        const teacher = await Teacher.findById(id);
        if (!teacher) {
            return res.status(404).send({ message: 'Teacher not found' });
        }
        if (name) teacher.name = name;
        if (subject) teacher.subject = subject;
        if (classes) teacher.classes = classes;

        await teacher.save();

        res.status(200).send({ message: 'Teacher updated successfully' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
