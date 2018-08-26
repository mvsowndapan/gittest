var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var jwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');

var config = require('./config');

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function(user){
    return jwt.sign(user,config.secretKey,{
        expiresIn:3600
    });
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new jwtStrategy(opts,(jwt_payload,done) => {
    console.log("jwt_paylload:",jwt_payload);
    User.findOne({_id:jwt_payload._id},(err,user) => {
        if(err){
            return done(err,false);
        }    
        else if(user){
            return done(null,user);
        }
        else{
            return done(null,false);
        }
    }); 
}));

exports.verifyUser = passport.authenticate('jwt',{session:false});

exports.verifyUser = passport.authenticate('jwt', { session: false });

exports.verifyAdmin = (req, res, next) => {
    if (!req.user.admin) {
        err = new Error('You are not authorized to perform this operation');
        err.status = 403;
        return next(err);
    } else
        return next();
};

exports.verifyUserSame = (req, res, next) => {
    Dishes.findById(req.params.dishId)
        .then((dish) => {
            if (!req.user._id.equals(dish.comments.id(req.params.commentId).author)) {
                err = new Error('You are not authorized to perform this operation');
                err.status = 403;
                return next(err)
            } else {
                return next();
            }
        }, (err) => next(err))
        .catch((err) => next(err));
};