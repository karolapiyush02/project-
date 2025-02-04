class ApiError extends Error { 

    constructor(
        stauscode,
        message = "somthing went wrong",
       )
     {
      super(message); 
      this.statuscode = stauscode;
      Error.captureStackTrace(this, this.constructor);
     }
}

export default ApiError;