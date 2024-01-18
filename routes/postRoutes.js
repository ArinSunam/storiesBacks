const express = require('express');
const router = express.Router();
const { getAllPosts, getPost, deletePost, updatePost, createPost } = require('../controllers/posts');
const { fileCheck } = require('../middlewares/file_check');

const notAllowed = (req, res) => res.status(405).json('method not allowed');

router.route('/api/posts').get(getAllPosts).all(notAllowed);
router.route('/api/posts/:id').get(getPost).delete(deletePost).patch(updatePost).all(notAllowed)
router.route('/api/posts').post(fileCheck, createPost).all(notAllowed);

module.exports = router;