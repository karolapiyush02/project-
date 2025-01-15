//try-catch request handler//
const asynchandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next)
    } catch (error) {
        res.status(error.code|| 500).json({
            success:false,
            message: error.message
        })
    }
}

//promises request handler//
const handler = (requestHandle) => {
    (req, res, next) =>{
        Promise.resolve(requestHandle(req, res, nex))
        .catch((error)).next((error))
    }
}

export{handler}