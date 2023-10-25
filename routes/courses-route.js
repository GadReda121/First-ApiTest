const express = require('express');
const courseController = require("../controllers/courses-controllers");
// const { validationSchema } = require('../middlewares/validationSchema');
const {body} = require('express-validator');
const verifyToken = require('../middlewares/verifyToken');
const role = require('../utils/roles');
const allowedTo = require('../middlewares/allowedTo');

const router = express.Router();

router
  .route("/")
  .get(courseController.getAllCourses)
  .post(
    [
      body("title")
        .notEmpty()
        .withMessage("Title Is Required")
        .isLength({ min: 2 })
        .withMessage("Title at least 2 digits"),
      body("price")
        .notEmpty()
        .withMessage("price Is Required")
        .isLength({ min: 2 })
        .withMessage("price at least 2 digits"),
    ],
    courseController.createCourse
  );
    
router
    .route("/:courseId")
    .get(courseController.getSingleCourse)
    .patch(courseController.updateCourse)
    .delete(verifyToken, allowedTo(role.ADMIN, role.MANAGER), courseController.deleteCourse);

module.exports = router;