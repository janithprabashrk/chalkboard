const router = require("express").Router();
const { Student } = require("../models/Scheam.js");
const bcrypt = require("bcrypt");

// Add student
router.route("/add").post(async (req, res) => {
    const { name, age, gender, password } = req.body;

    try {
        const existingStudent = await Student.findOne({ name });

        if (existingStudent) {
            return res.status(400).send({ status: "Error", message: "Student already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newStudent = new Student({
            name,
            age,
            gender,
            password: hashedPassword,
        });

        await newStudent.save();
        res.json("Student Added");
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error adding student", error: err.message });
    }
});

// View students
router.route("/").get(async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error fetching students", error: err.message });
    }
});
