const express = require('express');

const router = express.Router();

const usersContoller = require('../controllers/users_controller');

const verifyToken = require('../middlewares/verifyToken');

const multer = require('multer');
const upload = multer({
    storage : multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads');
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname);
        }
    }),
    fileFilter: (req, file, cb) => {
        const imageType = file.mimetype.split('/')[0];
        if(imageType !== 'image'){
            cb(new Error('File must be an image!'));
        } else {
            cb(null, true);
        }
    }
})

router.route('/')
    .get(verifyToken, usersContoller.getAllUsers);
    
router.route('/register')
    .post(upload.single('avatar') ,usersContoller.register);

router.route('/login')
    .post(usersContoller.login);

module.exports = router;