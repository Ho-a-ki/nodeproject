const express = require('express')
const router = express.Router()

const { isKorean } = require('./middlewares')

router.get('/', isKorean, (req,res) => {
    res.send("당신은 한국인이 맞네요!")
})

router.get('/eu', (req, res) =>{
    res.send("if you are not in korea, you see this")
})

module.exports = router;
