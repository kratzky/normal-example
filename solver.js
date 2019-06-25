const request = require('request-promise')

var api = {}

const getAnswer = (captchaId) => {
    return new Promise((resolve, reject) => {
        var qs = {
            key: api.key,
            json: 1,
            action: 'get',
            id: captchaId,
        }
        var options = {
            uri: api.res,
            qs,
            json: true
        }

        request(options)
            .then((res) => {
                if (res.status === 1) {
                    resolve(res.request)
                } else {
                    reject(res.request)
                }
            }).catch((e) => {
                reject(e)
            })
    })
}

const submitCaptcha = (imgBuffer) => {
    return new Promise((resolve, reject) => {
        var formData = {
            key: api.key,
            json: 1,
            method: 'base64',
            body: imgBuffer.toString('base64'),
        }
        var options = {
            uri: api.in,
            method: 'post',
            formData,
            json: true
        }

        request(options)
            .then((res) => {
                if (res.status === 1) {
                    resolve(res.request)
                } else {
                    reject(res.request)
                }
            }).catch((e) => {
                reject(e)
            })
    })
}


var solveMyCaptcha = (captchaId) => {
    return new Promise((resolve, reject) => {
        var loop = setInterval(async () => {
            try {
                var answer = await getAnswer(captchaId)
                clearInterval(loop)
                resolve(answer)
            } catch (e) {
                if (e != 'CAPCHA_NOT_READY') {
                    clearInterval(loop)
                    reject(e)
                }
            }
        }, 5000)
    })
}


const solveNormalCaptcha = async (params, image) => {
    return new Promise(async (resolve, reject) => {
        api = params
        try {
            var captchaId = await submitCaptcha(image)
            try {
                var answer = await solveMyCaptcha(captchaId)
                resolve(answer)
            } catch (e) {
                reject(e)
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = solveNormalCaptcha