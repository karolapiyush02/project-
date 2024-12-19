//asynchandles.js file will be a wrap for connection to server and will make easy//
//to connect to server  and wedont have to repeat the same code wrap again and again//

// there are two methoda to do it 
//1st one = try and catch method
//we are using higher-order function for this connect-wrap.
//for example_ 
       // const asynchandles = (fn) => () => {}.

/*const asynchandles = (fn) => async(req, res, next) => {
    try {
          await fn (req, res, next)        
    } catch (error) {
        res.send(error.code || 505).json9({
            success: false,
            message: error
        })
    }
};*/

//2nd process for connection through promises.

const asynchandles = (fn) =>{
    (req, res, next) =>{
        Promise.resolve(fn(req, res, next))
        .catch((error) => next((error)) 
    )
        
    }
};