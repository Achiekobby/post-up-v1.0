const jwt = require('jsonwebtoken')
const {AuthenticationError}  = require("apollo-server")

require('dotenv').config()

module.exports= (context)=>{

    //!context => {...headers}
    const authHeader = context.req.headers.authorization

    if(authHeader){
        const token = authHeader.split('Bearer ')[1];
        if(token){
            try{
                const user = jwt.verify(token, process.env.SECRET_KEY)
                return user;
            }
            catch(error){
                throw new AuthenticationError("Invalid/Expired Token")
            }
        }
        throw new Error('Authentication Token must be \'Bearer [token]')
    }
    throw new Error("Authentication header must be provided")
}