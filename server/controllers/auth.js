const { fakeDB } = require('../middlewares/fakeDB.js');


const registerController = async (req, res) => {
    const { email, password } = req.body; 
    try {
      const user = fakeDB.find( user => user.email === email)
      if (user) throw new Error("User already exists");
  
      const hashedPassowrd = await hash(password, 10);
      fakeDB.push({
        id: fakeDB.length,
        email,
        password: hashedPassword 
      });
      res.send({ message: 'User Created'});
      console.log(fakeDB);
    } catch (err) {
      //console.log(err)
      error: '${err.message}'
    }
}

module.exports.registerController = registerController 