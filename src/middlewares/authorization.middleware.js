export const authorization = roles =>{
    // console.log(req.user)
    return (req, res, next) =>{
        if(!req.user) return res.status(401).send("Unauthorized")
        if (!roles.includes(req.user.role)) {
            return res.status(401).send("No estás autorizado");
        }
        next()
    }
}
