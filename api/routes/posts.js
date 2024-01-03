const router = require("express").Router();
const Post = require("../models/Post")



//CREATE POST
router.post("/", async (req, res) => {
  const { title, desc } = req.body;
  console.log(req.body);
  if (!title || !desc) {
    return res.status(400).json({ error: "Title and content are  required!" })
  }


  try {
    const savedPost = await Post.create(req.body);
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);

  }


});
//UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost)

      } catch (err) {
        res.status(500).json(err)

      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (error) {
    res.status(500).json(err)
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