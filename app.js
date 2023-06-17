const express = require('express')
const ExpressError = require('./expressError');
const e = require('express');
const app = express()


app.get('/mean', (request, response, next) => {
    try{
        const nums = (request.query.nums).split(',').map(Number);
        if(nums.includes(NaN)) throw new ExpressError('Bad request', 400)
        return response.json({response: {operation: 'mean', value: mean(nums)}})
    } catch(error){
        if (error instanceof TypeError){
            next(new ExpressError('nums are required', 400))
        } else if (error instanceof ExpressError){
            next(error)
        }
    }

})

app.get('/median', (request, response, next) => {
    try{
        const nums = (request.query.nums).split(',').map(Number);
        if(nums.includes(NaN)) throw new ExpressError('Bad request', 400)
        return response.json({response: {operation: 'median', value: median(nums)}})
    } catch(error){
        if (error instanceof TypeError){
            next(new ExpressError('nums are required', 400))
        } else if (error instanceof ExpressError){
            next(error)
        }
    }
})

app.get('/mode', (request, response, next) => {
    try{
        const nums = (request.query.nums).split(',').map(Number);
        if(nums.includes(NaN)) throw new ExpressError('Bad request', 400)
        return response.json({response: {operation: 'mode', value: mode(nums)}})
    } catch(error){
        if (error instanceof TypeError){
            next(new ExpressError('nums are required', 400))
        } else if (error instanceof ExpressError){
            next(error)
        }
    }
})

app.use((resquest, response, next) => {
    const error = new ExpressError("Page Not Found", 404)
    next(error)
})


app.use((error, request, response, next) => {

    let status = error.status || 500
    let message = error.message

    return response.status(status).json({error: {message, status}})

})

app.listen(3000, () => {
    console.log("SERVER IS RUNNING AT PORT 3000")
})

function mean(array){
    return array.reduce( (accumulator, nextValue) => accumulator + nextValue ) / array.length
}

function median(array){
    if(array.length % 2 == 0) return (array[array.length / 2] + array[(array.length / 2) - 1]) / 2 
    else return array[Math.floor(array.length / 2)]
}

function mode(array){
    const count = {}
    for (let i = 0; i < array.length; i++) {
        if (!(array[i] in count)){
            count[array[i]] = 1
        } else {
            count[array[i]] = count[array[i]] + 1
        }
    }

    let highest = ''

    for (let key in count) {
        if (highest == '') highest = key
        else  {
            if (count[highest] < count[key]) highest = key
        }
    }

    return highest

}