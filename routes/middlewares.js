const publicIp = require('public-ip')
const axios = require('axios')


exports.isKorean = (req, res, next) => {
    publicIp.v4().then(ip => {
        const url = 'https://www.iplocate.io/api/lookup/' + ip
        axios.get(url)
            .then(function (response) {
                if (response['data']['country_code'] != "KR") {
                    res.redirect('/eu')
                }
                else {
                    console.log(url)
                    next()
                }
            })
            .catch(function (err) {
                console.error(err)
                next()
            })
    })
}



