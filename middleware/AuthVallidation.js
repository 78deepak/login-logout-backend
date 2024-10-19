const joi = require('joi');

const signupVallidation = (req, res, next)=>{
    const Schema = joi.object({
        name: joi.string().min(3).max(100).required(),
        email: joi.string().email().required(),
        password: joi.string().min(8).required(),
    });

    const {error} = Schema.validate(req.body);
    if(error){
        return res.status(400).json({message:"bad request" , error});
    }
    next()
}
const loginVallidation = (req, res, next)=>{
    const Schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(8).required(),
    });

    const {error} = Schema.validate(req.body);
    if(error){
        return res.status(400).json({message:"bad request" , error});
    }
    next()
}

module.exports = {
    signupVallidation,
    loginVallidation
}