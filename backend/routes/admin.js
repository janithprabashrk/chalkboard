const router = require("express").Router();
const { Admin } = require("../models/Scheam.js");
const bcrypt = require("bcrypt");

// Add Admin
router.route("/add").post(async (req, res) => {
    const { adminId, adminName, adminAge, adminGender, adminPassword } = req.body;

    try {
        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ adminName });

        if (existingAdmin) {
            return res.status(400).send({ status: "Error", message: "Admin already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(adminPassword, salt);

        const newAdmin = new Admin({
            adminId,
            adminName,
            adminAge,
            adminGender,
            adminPassword: hashedPassword, // Store hashed password
        });

        await newAdmin.save();
        res.json("Admin Added");
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error adding admin", error: err.message });
    }
});


module.exports = router;