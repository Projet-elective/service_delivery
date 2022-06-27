const jwt = require('jsonwebtoken');
 
exports.auth = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, 'sasori-secret-key');
       const userId = decodedToken.id;
       req.auth = {
           userId: userId
       };
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};