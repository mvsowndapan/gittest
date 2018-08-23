//PromoteRouter.js file


const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const Promotions = require('../models/promotions');
mongoose.plugin(schema => { schema.options.usePushEach = true });
const promoteRouter = express.Router();
promoteRouter.use(bodyParser.json());

//code for the GET,POST,PUT,DELETE for promotions using promoteRouter 
promoteRouter.route('/')
    .get((req, res, next) => {
        Promotions.find({})
            .then((promotion) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            },(err) => next(err))
            .catch((err) => next(err));
    })
    .post(authenticate.verifyUser,(req, res, next) => {
        Promotions.create(req.body)
            .then((promotion) => {
                // console.log('promotion Created', promotion);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put(authenticate.verifyUser,(req, res, next) => {
        res.statusCode = 403;
        res.end("put operation not supported");
    })
    .delete(authenticate.verifyUser,(req, res, next) => {
        Promotions.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });



// //code for the GET,POST,PUT,DELETE for promoId using promoteRouter

promoteRouter.route('/:promoId')
.get((req,res,next) => {
     Promotions.findById(req.params.promoId)
     .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    },(err) => next(err))
    .catch((err) => next(err));
 })
.post(authenticate.verifyUser,(req,res,next) => {  
    res.end("Post operation does not supported on /Promotions/"+req.params.promotionId);
})
.put(authenticate.verifyUser,(req,res,next) => {
    Promotions.findByIdAndUpdate(req.params.promoId,{
        $set: req.body
    },{new : true})  
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(authenticate.verifyUser,(req,res,next) => {
    Promotions.findByIdAndRemove(req.params.promoId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});


module.exports = promoteRouter;