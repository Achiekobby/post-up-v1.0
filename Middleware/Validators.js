module.exports.validateRegisterInput = (username,email,password, confirm_password)=>{
    /**
     * Todo: creating an empty error object
    */
    const errors = {}

    /**
     * Todo: Setting the conditions for validations 
     */
    //! Username Validation
    if(username.trim(username)===""){
        errors.username = "Username must not be empty";
    }

    //! Email Validation
    const validEmailExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(!email.match(validEmailExp)){
        errors.email = "Email must be a valid email address";
    }
    else if(email.trim()===""){
        errors.email = "Email must not be empty";
    }

    //!password validation
    if(password.trim()===""){
        errors.password = "Password must be provided";
    }
    else if(password.length < 8 && password !== confirm_password){
        errors.password = "Password length is too short or do not match"
    }

    //!confirm_password validation
    if(confirm_password.trim()===""){
        errors.confirm_password = "Confirm password field must not be empty";
    }
    else if(confirm_password !== password){
        errors.confirm_password = "Password must match"
    }

    //Todo: Returning final validation errors
    return {
        errors,
        valid: Object.keys(errors).length< 1 ? true : false
    };
}