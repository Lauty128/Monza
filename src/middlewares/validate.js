export const validate = (req,res,next) => {
    
    if(req.headers.referer && req.headers.referer.includes('storied-kataifi-d0b4f5.netlify.app')){
        return next()
    }

    return res.status(401).json({
        status:401,
        message:"No esta autorizado para acceder a este servidor"
    })
}