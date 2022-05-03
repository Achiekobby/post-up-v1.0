const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {UserInputError} = require("apollo-server")
const {validateRegisterInput} = require('../../Middleware/Validators')

const User = require("../../Models/User")
require('dotenv').config()


module.exports = {
    Mutation:{
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

            //!Making a registration token
            const token = jwt.sign({
                id:result.id,
                email:result.email,
                username: result.username
            }, process.env.SECRET_KEY,{expiresIn:"1h"})

            return{
                ...result._doc,
                id:result._id,
                token
            }

            
        }
    }
}