const router = require("express").Router();
const Post = require("../models/Post");
const checkFile = require("../middlewares/file_check")





//CREATE POST
router.post("/",
  checkFile.fileCheck,
  async (req, res) => {
    const { title, desc, username } = req.body;
    const photo = req.imagePath;
    console.log(req.body);
    console.log('photo', req.imagePath)
    if (!title || !desc) {
      return res.status(400).json({ error: "Title and content are  required!" })
    }


    try {
      const savedPost = await Post.create({ title, desc, photo, username });
      res.status(200).json(savedPost);
    } catch (error) {
      res.status(500).json(error);
      console.error('posting error', error)

    }


  });
//UPDATE POST
router.patch("/:id", checkFile.updateCheck, async (req, res) => {
  const id = req.params.id
  try {
    const post = await Post.findById(id);
    if (post.username === req.body.username) {


      const {
        title,
        desc
      } = req.body;
      console.log('req body', req.body);
      try {
        let updatedPost;
        if (req.imagePath) {
          updatedPost =
            await Post.findByIdAndUpdate(id,
              {
                title,
                desc,
                photo: req.imagePath
              });
        } else {
          updatedPost = await Post.findByIdAndUpdate(req.params.id, {
            title,
            desc
          })

        }
        res.status(200).json('update Successful')

      } catch (err) {
        res.status(500).json(`${err}`);
        console.log('err', err);

      }
    } else {
      console.log('post username', post.username)
      console.log('req username', req.body.username)
      res.status(401).json("You can update only your post!");
    }
  } catch (error) {
    res.status(500).json(error);
    console.log('error update', error)
  }

});

//DELETE POST:Problema

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.deleteOne();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS

router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;

  try {
    let posts;
    if (username) {
      posts = await Post.find({ username })
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName]
        }
      })
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;