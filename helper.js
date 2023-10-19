const jwt = require('jsonwebtoken');

let helper = {
    checkIfUser:function(req,res,next){
        try {
            let header = req.headers.authorization;
            if(!header){
                throw({
                    message: "Authorization header is required"
                })
            }
            else{
                let splitTokn = header.split(' ');
                let token = splitTokn[1];
                if (!token) throw({
                    message: "Authorization header is required"
                })
                let userData = jwt.verify(token, process.env.JWT_SECRET);
                if(!userData){
                    res.status(401);
                    return res.send("Unauthorized user")
                }      
               next();
            }
        } catch (error) {
            console.log("error",error)
            res.status(401);
            return res.send("Unauthorized user")
        }
    },
}

module.exports = helper;