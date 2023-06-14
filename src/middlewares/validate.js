export const validate = (req,res,next) => {
    //console.log(req.headers.origin);
    if(req.headers.origin.includes('https://storied-kataifi-d0b4f5.netlify.app')){
        return next()
    }

    return res.status(401).json({
        status:401,
        message:"No esta autorizado para acceder a este servidor"
    })
}