import jwt from "jsonwebtoken";

const authenticate = (req,res,next) => {
    return next()
    console.log('Cambio de pagina');
    if(req.url != '/login'){
        return res.redirect('/login')
    }
    next()
}

export default {
    authenticate
}