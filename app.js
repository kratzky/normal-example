const fs = require('fs')
const solveNormalCaptcha = require('./solver')

const api = {
    in: 'http://2captcha.com/in.php',
    res: 'http://2captcha.com/res.php',
    key: 'YOUR_API_KEY'
}

fs.readFile('./img.png', ((err, buf) => {
    if (err) return console.log(err)
    solveNormalCaptcha(api, buf)
        .then((answer) => {
            console.log(answer)
        })
        .catch((e) => {
            console.log(e)
        })
}))