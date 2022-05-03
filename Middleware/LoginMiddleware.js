module.exports.loginValidator = (username, password)=>{
    //Todo: Creating an empty errors object here
    const errors = {};

    //Todo: Validation conditions for the login functionality

    //!Username Validation
    if(username.trim()===""){
        errors.username = "Username must not be empty";
    }

    //!Password Validation
    if(password.trim()===""){
        errors.password = "Password must not be empty";
    }
    else if(password.length < 8){
        errors.password = "Password must be at least 8 characters";
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1 ? true : false,
    }
}