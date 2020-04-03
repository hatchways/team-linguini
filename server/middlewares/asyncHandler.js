//The function to handle the async when there is error

module.exports = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}