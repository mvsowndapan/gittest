//leaderRouter.js file
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const Leaders = require('../models/leaders');
const cors = require('./cors');
mongoose.plugin(schema => { schema.options.usePushEach = true });
const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());


//code for the GET,POST,PUT,DELETE for leaders using leaderRouter
leaderRouter.route('/')
    .options(cors.corsWithOptions, (res, req) => { res.sendStatus(200); })
    .get(cors.cors, (req, res, next) => {                 // get request handling
        Leaders.find({})
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {                // post request handling
        Leaders.create(req.body)
            .then((leader) => {
                // console.log('leader Created', leader);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {                 //put request handling
        res.statusCode = 403;
        res.end("put operation not supported");
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {              //delete request handling 
        Leaders.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });



// //code for the GET,POST,PUT,DELETE for leaderId using leaderRouter

leaderRouter.route('/:leaderId')
    .options(cors.corsWithOptions, (res, req) => { res.sendStatus(200); })
    .get(cors.cors, (req, res, next) => {                  //get reuest id handling
        Leaders.findById(req.params.leaderId)
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {                 //post reuest id handling
        res.end("Post operation does not supported on /Leaders/" + req.params.leaderId);
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {                   //put reuest id handling
        Leaders.findByIdAndUpdate(req.params.leaderId, {
            $set: req.body
        }, { new: true })
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {                //delete reuest id handling
        Leaders.findByIdAndRemove(req.params.leaderId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });


module.exports = leaderRouter;