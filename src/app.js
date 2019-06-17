const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const pubDirectoryPath = path.join(__dirname , '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(pubDirectoryPath))

// Home page route
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Lance'
    })
})

// About page route
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Lance Huddleston II'
    })
})

// Weather page route
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({error: 'No address provided'})
    }
    const userLocation = req.query.address 
    geocode(userLocation, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        } 
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            return res.send({
                location,
                forecastData
            })
        })
    })

})

// JSON route / Query String Example
// app.get('/products', (req, res) => {
//     if (!req.query.search) {
//         return res.send({
//             error: 'You must provide a search term'
//         })
//     }
//     console.log(req.query)
//     res.send({
//         products: []
//     })
// })

// Help page route
app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Need help? Call 1-800-555-5555',
        title: 'help',
        name: 'Lance Huddleston II'
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Lance Huddleston II'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: "Lance Huddleston II"
    })
})

app.listen(3000, () => {
    console.log('The server is up on port 3000')
})

