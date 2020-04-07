/* @desc: This class extends Error to both contain an http error status code and end user message.
 * @param: "statusCode", refers to an http error code.  "message", refers to an a legible message explaining to user the error.
 * @returns: a new instance of ErrorResponse. 
*/
class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message);
        this.status = statusCode
    }
}

/* @desc: A helper function that displays all messages as an array.
*/
const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
    // Build your resulting errors however you want! String, object, whatever - it works!
    return [`${msg}`];
  };

module.exports.ErrorResponse = ErrorResponse;
module.exports.errorFormater = errorFormatter