const Joi = require('joi');


const registerValidation = async data => {

    const schema = await Joi.object({
        name: Joi.string().required().min(2),
        email: Joi.string().email().min(6).required(),
        password: Joi.string().min(6).required(),
        status: Joi.string().required(),
        username: Joi.string().required(),
        hash: Joi.string().required()
    })
    return schema.validate(data);
}


const loginValidation = async data => {

    const schema = await Joi.object({
        email: Joi.string().email().min(6).required(),
        password: Joi.string().min(6).required()
    })

    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;