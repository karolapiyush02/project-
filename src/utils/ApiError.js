class ApiError extends error{
    constructor(
        stauscode,
        message = "somthing went wrong",
        errors = {},
        stack = ""
    ){
        super(message)
        this.statusCode = stauscode
        this.message = message
        this.sunccess = false;
        this.errors = errors
        if(stack) {
            this.stack = stack
        }else{
            error.captureStackTrace(this, this.constractor)
        }
    }
}

export {ApiError}