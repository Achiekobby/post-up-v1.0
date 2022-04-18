const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {UserInputError} = require("apollo-server")

const User = require("../../Models/User")
require('dotenv').config()


module.exports = {
    Mutation:{
        async register(_, {registerInput:{username, email, password, confirm_password}}){
            /**
             * TODO: Validate user data
             */
            /**
             * TODO: Making sure user does not already exist
             */
            const user = await User.findOne({username});
            if(user){
                throw new UserInputError('Username is taken',{
                    errors:{
                        username:"This username is taken"
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