const path = require('path');
const fs = require('fs');

module.exports.fileCheck = (req, res, next) => {
  console.log(req.body)
  if (!req.files?.photo) {
    return res.status(400).json('please provide image');
  } else {
    const file = req.files?.photo;
    const exts = ['.png', '.jpeg', '.jpg'];
    const filePath = path.extname(file.name);
    if (exts.includes(filePath)) {
      file.mv(`./uploads/${file.name}`, (err) => {
      });

      req.imagePath = `/uploads/${file.name}`;
      console.log('meow', req.imagePath);
      next();


    } else {
      return res.status(400).json('Please provide valid image');
    }
  }
}

module.exports.updateCheck = (req, res, next) => {
  if (!req.files?.photo) {
    next();
  } else {
    fs.unlink(`.${req.body.prevImage}`,
      (err) => {
        console.log('no prev img err:', err)
      });

    const file = req.files?.photo;
    console.log('sent photo', file);

    const exts = ['.png', '.jpeg', '.jpg'];
    const filePath = path.extname(file.name);
    console.log('filePath', filePath)
    if (exts.includes(filePath)) {
      file.mv(`./uploads/${file.name}`, (err) => {
        console.log('file mv err', err)

      });
      req.imagePath = `/uploads/${file.name}`;
      console.log('req.imagePath', req.imagePath);

      next();
    } else {
      return res.status(400).json('please provide valid image');
    }
  }
}

