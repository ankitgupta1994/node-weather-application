const request = require('request')

const forecast = (latitude,longitude,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=275db54780f73109fb1fbace71f28bad&query='+latitude +','+longitude + '&units=f'
    request({url:url, json:true},(error,response) =>{
        if(error){
            callback('Can not reach the server!')
        } else if(response.body.error){
            callback('Can not connect to the address!')
        } else{
            callback(undefined, 'The temperatue out there is ' + response.body.current.temperature + ' Fahrenheit and the chance of precipitation is '+ response.body.current.precip + "%")
        }
    })
}
    
module.exports = forecast;