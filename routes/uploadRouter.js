const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const multer = require('multer');
const cors = require('./cors');
const storage = multer.diskStorage(
    {
        destination: (req, file, cb) => {
            cb(null, 'public/images');
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }
    }
);

const imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('u can upload image files!'), false);
    }
    cb(null, true);
};
const upload = multer({ storage: storage, fileFilter: imageFileFilter });

const uploadRouter = express.Router();
uploadRouter.use(bodyParser.json())

uploadRouter.route('/')
    .options(cors.corsWithOptions, (res, req) => { res.sendStatus(200); })
    .get(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('get operation not supported on /image upload');
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, upload.single('imageFile'), (req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(req.file);
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('put operation not supported on /image upload');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('delete operation not supported on /image upload');
    });


module.exports = uploadRouter;