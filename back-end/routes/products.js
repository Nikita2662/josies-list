const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('this is product route');
});

router.get('/item', (req, res) => {
    res.send('this is a specific item for sale');
});

router.get('/102', (req, res) => {
    res.send('this is product 102 route');
});

module.exports = router; 