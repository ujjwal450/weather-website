const form = document.querySelector('.weather-form')
const search = document.querySelector('input')

form.addEventListener('submit', (e) => {
        const location = search.value   
        document.querySelector('.message-1').innerHTML = 'Loading...'
        document.querySelector('.message-2').innerHTML = ''
         fetch('/weather?address=' + location).then((res) => {
        res.json().then((data) => {
        if(data.message){
            document.querySelector('.message-1').innerHTML = data.message
        }else{
            document.querySelector('.message-1').innerHTML = data.location
            document.querySelector('.message-2').innerHTML = data.forecast
        }
     })
    })

    e.preventDefault()
})
