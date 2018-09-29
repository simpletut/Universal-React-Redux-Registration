const express = require('express');
const router = express.Router();
const webConfig = require('./../webConfig.json');

router.use('/', (req,res) => {
    res.redirect(`${webConfig.frontend_url}/error`);
});

module.exports = router;