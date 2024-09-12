const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.json([ ]);  // Now you can access the globally scoped obj
});

module.exports = router;
