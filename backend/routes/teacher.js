const router = require("express").Router();
const { Teacher } = require("../models/Scheam.js");
const bcrypt = require("bcryptjs"); // Import bcryptjs

// Add Teacher route with password hashing
router.route("/add").post(async (req, res) => {
  const { teacherId, name, age, gender, password } = req.body;

  try {
    // Check if teacher already exists
    const existingTeacher = await Teacher.findOne({ teacherId });

    if (existingTeacher) {
      return res.status(400).send({ status: "Teacher already exists" });
    }

    // Hash the password before storing it
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new teacher with hashed password
    const newTeacher = new Teacher({
      teacherId,
      name,
      age,
      gender,
      password: hashedPassword, // Store hashed password
    });

    await newTeacher.save();
    res.json("Teacher added successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "Error adding teacher", error: err.message });
  }
});
