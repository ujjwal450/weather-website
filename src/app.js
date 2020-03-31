const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()

const port = process.env.PORT || 3000


const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')
app.use(express.static(path.join(__dirname, '../public')))

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)


app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Ujjwal Kamilya'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        about: 'about',
        title: 'About me',
        name: 'Ujjwal Kamilya'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        help: 'Help',
        title: 'Help',
        name: 'Ujjwal Kamilya'
    }) 
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            message: 'Please provide an address'
        })
    }
    geocode(req.query.address, (err, response) => {
        if(err){
            return res.send({
                error: err
            })
        }else{
            forecast(response.latitude, response.longitude, (err, forecastResponse) => {
                if(err){
                    return res.send({
                        error: err
                    })
                }else{
                    res.send({
                        location: response.location,
                        forecast: forecastResponse,
                        address: req.query.address
                    })
                }
            })
        }
    })
    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help article not found',
        title: '404 error',
        name: 'Ujjwal Kamilya'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page not found',
        title: '404 error',
        name: 'Ujjwal Kamilya'
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
})
