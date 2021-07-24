const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode= require('./utils/geocode')
const forecast= require('./utils/forecast')
// console.log(__dirname);
// console.log(path.join(__dirname, '../public'))



const app =  express();
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views' , viewsPath)
hbs.registerPartials(partialPath)

//Setup  static dictionary  to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index' , {
        title: 'Wether App',
        name: 'Ankit Gupta'
    })
})

app.get('/about' , (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Ankit Gupta'
    })
})


app.get('/help', (req ,res) =>{
    res.render('help' ,{
        helpText: 'This is some random text',
        title: 'About Me',
        name: 'Andrew Mead'

    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'You  must provide the address'
        })
    }

    geocode(req.query.address, (error,{latitude, longitude, location} = {}) =>{
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) =>{
            if(error){
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia',
    //     address: req.query.address
    // })
})


// app.get('/help', (req,res) => {  
//     res.send({
//         name: 'Ankit',
//         age: 27
//     })
// })


// app.get('/about', (req,res) => {
//     res.send('More information')
// })


app.get('/products', (req,res) =>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name:'Ankit',
        ErrorMessage: 'Help not found.'
    })
})

app.get('*' , (req, res) =>{
    res.render('404', {
        title: '404',
        name: 'Ankit',
        ErrorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
})