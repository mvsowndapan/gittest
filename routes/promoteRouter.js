//PromoteRouter.js file

const express = require('express');
const bodyParser = require('body-parser');

const promoteRouter = express.Router();  //promoteRouter declaration
promoteRouter.use(bodyParser.json());

//code for the GET,POST,PUT,DELETE for promotions using promoteRouter 
promoteRouter.route('/')                
.all((req,res,next) => {
    res.statusCode= 200;
    res.setHeader('Contenet-Type','text/plain');
    next();
 })
.get((req,res,next) => {
     res.end("will send all promotion to u");
 })
.post((req,res,next) => {  
    res.end("will add all promotions: "+ req.body.name + ' with details: ' + req.body.description);
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end("put operation not supported in /promotions");
})
.delete((req,res,next) => {
    res.end("deleting all promotions");
});


//code for the GET,POST,PUT,DELETE for promoId using promoteRouter
promoteRouter.route('/:promoId')
.all((req,res,next) => {
    res.statusCode= 200;
    res.setHeader('Contenet-Type','text/plain');
    next();
 })
.get((req,res,next) => {
     res.end("will send all promotions: "+req.params.promoId + " to u");
 })
.post((req,res,next) => {  
    res.end("Post operation does not supported on /promotions/"+req.params.promoId);
})
.put((req,res,next) => {
    res.write("Updating the promotions: "+req.params.promoId);
    res.end("   will update the promotions : "+req.body.name+" with details "+ req.body.description);
})
.delete((req,res,next) => {
    res.end("Deleting the promotions: "+req.params.promoId);
});

module.exports = promoteRouter;