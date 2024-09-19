// routes/posts.js
const express = require('express');
const router = express.Router();

const posts = [
  // Aquí irían tus publicaciones de ejemplo
];

router.get('/', (req, res) => {
  res.json(posts);
});

module.exports = router;