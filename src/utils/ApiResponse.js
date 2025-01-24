class ApiResponse {
    constructor(statusCode, data, message = "success"){
        this.statusCode = statusCodethis.
        this.data = data,
        this.message = message
        this.success = statuCode < 400
    }

}

export {ApiResponse}