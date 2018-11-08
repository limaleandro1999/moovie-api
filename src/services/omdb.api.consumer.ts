import * as request from 'request-promise'
import { environment } from '../config/environment'

const requestOptions: request.OptionsWithUrl = {
    url: '',
    json: true,
    headers:{
        'User-Agent': 'Moovie',
        'Content-type': 'application/json'
    }
}

const requestData = (url) => {
    requestOptions.url = url;

    return request(requestOptions).then(body => {
        return body
    }).catch(error => {
        return error
    })
}

export const getMovieByTitle = async (title: string) => {
    title.replace(' ', '_')
    const movie = await requestData(`http://www.omdbapi.com/?t=${title}&apikey=${environment.security.apikey}`)
    console.log(movie)
    return movie
}

export const getMoviesBySearch = async (search) => {
    search.replace(' ', '_')
    const movies = await requestData(`http://www.omdbapi.com/?s=${search}&apikey=${environment.security.apikey}`)

    return movies
}