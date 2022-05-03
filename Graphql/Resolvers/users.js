const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {UserInputError} = require("apollo-server")
const {validateRegisterInput} = require('../../Middleware/Validators')
const {loginValidator} = require('../../Middleware/LoginMiddleware')

const User = require("../../Models/User")
require('dotenv').config()

//Todo: Token Generation method for login and register
function generateToken(user){
    const token = jwt.sign({
        id:user.id,
        email:user.email,
        username: user.username
    }, process.env.SECRET_KEY,{expiresIn:"1h"})

    return token
}

module.exports = {
    Mutation:{
        //!LOGIN A USER
        async login(_,{username, password}) {
            const {errors, valid} = loginValidator(username, password)

            if(valid===false){
                throw new UserInputError("Errors", {errors})
            }
            const user = await User.findOne({username})

            if(!user){
                errors.general = "User not found"
                throw new UserInputError("User not found", {errors});
            }

            const password_match = await bcrypt.compare(password, user.password)
            if(!password_match){
                errors.general = "Wrong Credentials"
                throw new UserInputError("Wrong Credentials", {errors});
            }
            const token = generateToken(user)

            return {
                ...user._doc,
                id:user.id,
                token

            }
        },


        //!REGISTER A NEW USER
        async register(_, {registerInput:{username, email, password, confirm_password}}){
            /**
             * TODO: Validate user data
             */
            const{ errors, valid } = validateRegisterInput(
                username, email, password, confirm_password
            );
            if(valid===false){
                throw new UserInputError("Errors",{errors});
            }
            /**
             * TODO: Making sure user does not already exist
             */
            const user = await User.findOne({$or:[{username},{email}]});
            if(user){
                throw new UserInputError('Username or Email is taken',{
                    errors:{
                        username:"This user already exist"
                    }
                })
            }
            /**
             * TODO: Hashing password and creating authentication token
             */

            password = await bcrypt.hash(password,12)

            const newUser = new User({
                email: email,
                username: username,
                password: password,
                created_at: new Date().toISOString(),
            })

            const result = await newUser.save()
            const token = generateToken(result)

            return{
                ...result._doc,
                id:result._id,
                token
            }

            
        }
    }
}