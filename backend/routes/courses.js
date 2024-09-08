const router = require("express").Router();
const { Course } = require("../models/Scheam.js");


router.route("/add").post(async (req, res) => {
    const {   courseId , courseName , NoOfStudent , courseFee , lectureName , Duration } = req.body;

    try {
        const existingCourse = await Course.findOne({courseId});

        if (existingCourse){
            return res.status(400).send(({status: "Error"}));
        }
        const newCourse = new Course({
            courseId,
            courseName, 
            NoOfStudent,
            courseFee, 
            lectureName,
            Duration
        });

        await newCourse.save();
        res.json("Course Added");
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error adding student", error: err.message });
    }
});

//view
router.route("/view").get(async (req, res) => {
    try {
        const course = await Course.find();
        res.json(course);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error fetching courses", error: err.message });
    }
});
