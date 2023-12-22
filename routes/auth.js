const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');


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
  try {
    const user = await User.findOne({ username: req.body.username })
    !user && res.status(400).json("Invalid Credentials!");

    const validated = await bcrypt.compare(req.body.password, user.password)
    !validated && res.status(400).json("Invalid Credentials!");

    const { password, ...others } = user._doc;

    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;