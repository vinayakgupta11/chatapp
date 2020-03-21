const jwt = require("jsonwebtoken");
const config = require('../ChatApp/config/database.config');

module.exports={
    verify(req, res, next)
    {  
        var token =  req.headers["token"];
     
        if (!token) return res.status(401).send("Access denied. No token provided.");
        try {
            
          const decoded = jwt.verify(token, config.secret);
          
          req.user = decoded;
          next();
        } catch (ex) {
            console.log("error in token verification--", ex);
            
          res.status(400).send("Invalid token.");
        }
      }
      
      


    
};