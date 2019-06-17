const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/89df374ddd18c0f87cdd4dcaf68642df/${latitude},${longitude}`
    request({url, json: true}, (error, {body:response}) => {
        if (error) {
            callback("Unable to connect to weather service", undefined)
        } else if (response.error) {
            callback('Unable to find location', undefined)
        } else {
            const temperature = Math.round(response.currently.temperature)
            const tempHigh = Number(Math.round(response.daily.data[0].temperatureHigh))
            const tempLow = Number(Math.round(response.daily.data[0].temperatureLow))
            const rainProbability = response.currently.precipProbability
            const summary = response.currently.summary
            const daily = response.daily.summary
            const data = `${summary}. It is currently ${temperature} degrees out, with a high of ${tempHigh} and a low of ${tempLow}.  There is a ${rainProbability}% chance of rain. ${daily}`
            callback(undefined, data)
        }
    })
}

module.exports = forecast 
