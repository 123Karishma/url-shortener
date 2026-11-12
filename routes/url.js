const express = require('express')

const { handlegeneratedNewUrl } = require('../controllers/url')
const router = express.Router();

router.post('/', handlegeneratedNewUrl)

module.exports = router