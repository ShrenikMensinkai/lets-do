const jwt = require('jsonwebtoken');
const httperror = require('http-errors');

function authenticate(req, res, next) {
    let token = req.headers['token'];
        if (!token){
            throw new httperror(401, 'Invalid password or email');
        }else{
        try{
            let decoded = jwt.verify(token,process.env.SECRET);
            req.query.user_id = decoded.user_id;
            next();
        } catch(error){
            throw new httperror(error.status||500, error.message||"Internal server error"); 
        }
    }
}
module.exports = authenticate;