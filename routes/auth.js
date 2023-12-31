const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//Register
router.post("/register", async (req, res) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 12);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    })

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Login

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const isExist = await User.findOne({ username: username });
    console.log('user exist', isExist)
    if (isExist) {
      const isPass = bcrypt.compareSync(password, isExist.password);
      const token = jwt.sign({
        id: isExist._id
      }, 'jsonToken');

      if (isPass)
        return res.status(200).json({
          id: isExist._id,
          username,
          token,
          email: isExist.email
        });

      return res.status(401).json('wrong credential');


    } else {
      return res.status(401).json('invalid credential');
    }


  } catch (err) {
    console.error(err);
    return res.status(400).json('wrong credential');
  }

});

module.exports = router;