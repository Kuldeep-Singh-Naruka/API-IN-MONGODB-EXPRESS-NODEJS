const db = require("../db");
const Classes = db.classes; 
// Create Class
exports.create = async (req, res) => {
    try {
        const { classesName } = req.body;
        const existingClass = await Classes.findOne({ classesName });
        if (existingClass) {
            return res.status(400).send({ message: 'Class already exists' });
        }
        const newClass = new Classes({ classesName });
        await newClass.save();

        res.status(201).send({ message: 'Class created successfully' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

//all classes
exports.allClasses = async (req, res) => {
    try {
        const classes = await Classes.find();
        res.status(200).send(classes);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Delete
exports.delete = async (req, res) => {
    try {
        const { id } = req.body;
        const classToDelete = await Classes.findById(id);
        if (!classToDelete) {
            return res.status(404).send({ message: 'Class not found' });
        }

        await Classes.deleteOne({ _id: id });

        res.status(200).send({ message: 'Class deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Update class
exports.updateClasses = async (req, res) => {
    try {
        const { id, classesName } = req.body;
        const classToUpdate = await Classes.findById(id);
        if (!classToUpdate) {
            return res.status(404).send({ message: 'Class not found' });
        }
        if (classesName) classToUpdate.classesName = classesName;

        await classToUpdate.save();

        res.status(200).send({ message: 'Class updated successfully' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
