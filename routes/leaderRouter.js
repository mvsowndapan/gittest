//leaderRouter.js file

const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());


//code for the GET,POST,PUT,DELETE for leaders using leaderRouter
leaderRouter.route('/')
.all((req,res,next) => {
    res.statusCode= 200;
    res.setHeader('Contenet-Type','text/plain');
    next();
 })
.get((req,res,next) => {
     res.end("will sent u leader details ");
 })
.post((req,res,next) => {  
    res.end("will add all leader : "+ req.body.name + ' with details ' + req.body.description);
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end("put operation not supported");
})
.delete((req,res,next) => {
    res.end("deleting all leadership");
});


//code for the GET,POST,PUT,DELETE for leaderId using leaderRouter
leaderRouter.route('/:leaderId')
.all((req,res,next) => {
    res.statusCode= 200;
    res.setHeader('Contenet-Type','text/plain');
    next();
 })
.get((req,res,next) => {
     res.end("will send details of leaders: "+req.params.leaderId + " to u");
 })
.post((req,res,next) => {  
    res.end("Post operation does not supported on /leader/"+req.params.leaderId);
})
.put((req,res,next) => {
    res.write("Updating the leader: "+req.params.leaderId);
    res.end('  will update the leader: '+req.body.name+' with details '+ req.body.description);
})
.delete((req,res,next) => {
    res.end("Deleting the leader: "+req.params.leaderId);
});

module.exports = leaderRouter;