const User = require('../models/Users')

const registerController = async (req, res) => {
    console.log("abc")

    const { name, email, password } = req.body; 
    //const name = 'placeholder'
    //console.log(name)
    console.log("abc")
    console.log(req.body)
    console.log(name)
    console.log(email)
    console.log(password)
    try {
      const user = await User.find()
        res.status(200).json(user)

      console.log(user)
    } catch (err) {
      error: '${err.message}'
    }
}

module.exports.registerController = registerController 