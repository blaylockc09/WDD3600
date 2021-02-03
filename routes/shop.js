const path = require('path');

const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    // dirname gets the path of the local machine, adding '../' will go up a level so we can get to the views folder.
    res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));
});

module.exports = router;

