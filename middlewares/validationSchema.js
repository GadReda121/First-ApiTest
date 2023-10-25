const { body } = require("express-validator");

const validationSchema = () => {
    return [
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
    ]
}

module.exports = {
    validationSchema
}