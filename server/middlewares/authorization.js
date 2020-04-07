const User = require('../models/Users');
const { verify } = require('jsonwebtoken');
const { ErrorResponse } = require('../utils/errorResponse')


/* @desc: This middleware function ensures that a JWT exists in the header
 * and if one does exists the function extracts and decodes the JWT to 
 * get a user ID to verify that a user exists. The user is then assigned to the request object 
 * under user. 
 * @param: req, res, next
 * @returns: none
*/
module.exports.isAuthorized = async ( req, res, next ) => {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = verify(token, process.env.ACCESS_TOKEN_SECRET);
            console.log(decoded.id);
            const user = await User.findById(decoded.id);
            user.password = undefined
            console.log(user);
            req.user = user;
            next()
        } catch {
            return next(new ErrorResponse('Error verifying authorization.', 500))
        }

    } else {
        return next(new ErrorResponse('Authorization Failed.', 401))
    }
};