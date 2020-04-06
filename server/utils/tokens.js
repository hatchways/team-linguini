const { sign } = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse')

module.exports.accessToken = ( userID ) => {
    return sign({ id: userID }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '2h',
    });
};


