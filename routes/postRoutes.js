const express = require('express');
const router = express.Router();
const { getAllPosts } = require('../controllers/posts');
const { fileCheck } = require('../middlewares/file_check');

const notAllowed = (req, res) => res.status(405).json('method not allowed');

router.route('/api/posts').get(getAllPosts).all(notAllowed);

module.exports = router;