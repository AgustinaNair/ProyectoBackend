export function auth (req, res, next){
    if(req.cookies?.user?.admin){
        return next()
    }   
    return res.status(401).send("No estas autorizado")
}