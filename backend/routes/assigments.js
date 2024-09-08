const router = require("express").Router();
const { Assignment } = require("../models/Scheam.js");
const multer = require("multer");
const fs = require('fs');
const path = require('path');

// Image storage engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

router.route("/add").post(upload.single('file'), async (req, res) => {
    
    try {
        const newAssignment = new Assignment({
            assignmentId: req.body.assignmentId,
            description: req.body.description,
            dueDate: req.body.dueDate,
            pdfFile: req.file ? req.file.path : null,
            courseId: req.body.courseId,
        });

        await newAssignment.save();
        res.status(200).json({ message: "Assignment added successfully!" });
    } catch (error) {
        console.log(error); // Log detailed error
        res.status(500).json({ message: "Error adding assignment", error });
    }
});
