import axios from 'axios';
import { utilService } from './util.service'
const API_KEY = 'SElSSUY2anGKSqwM3J7MWFNbNOEyOMm8'
const BASE_URL = 'https://dataservice.accuweather.com/'


export const appService = {
    getForcast,
    getAutoCompleteSearch,
    getForcastByKey
}

async function getForcast(filterBy) {
    try {
        if (filterBy?.keyword) {
            if (!utilService.isEnglish(filterBy.keyword)) {
                return Promise.reject("Please use English letters only!")
            }
        }
        if (!filterBy?.keyword && !filterBy?.geoLocation) filterBy.keyword = 'Tel Aviv'

        let dataLocation
        let dataForcast
        let resLocation
        let key

        if (filterBy.keyword) {
            const { keyword } = filterBy
            resLocation = await axios.get(`${BASE_URL}locations/v1/cities/search?q=${keyword}&apikey=${API_KEY}`);
            key = resLocation?.data[0]?.Key
            dataLocation = resLocation.data[0]

        } else {
            const { geoLocation: { latitude, longitude } } = filterBy
            resLocation = await axios.get(`${BASE_URL}locations/v1/cities/geoposition/search.json?q=${latitude},${longitude}&apikey=${API_KEY}`);
            key = resLocation?.data?.Key
            dataLocation = resLocation.data
        }

        if (!key) return Promise.reject('Location wasnt found, please try again!')

        const resForcast = await axios.get(`${BASE_URL}forecasts/v1/daily/5day/${key}?apikey=${API_KEY}`)
        if (!resForcast?.data) return Promise.reject('Location wasnt found, please try again!')
        dataForcast = resForcast.data

        const res = utilService.organizeData(dataForcast, dataLocation)
        return res

    } catch (err) {
        throw err
    }
}

async function getForcastByKey(key) {
    try {
        const resForcast = await axios.get(`${BASE_URL}forecasts/v1/daily/5day/${key}?apikey=${API_KEY}`)
        let dataForcast = utilService.organizeForcastData(resForcast.data, key)
        return dataForcast

    } catch (err) {
        throw err
    }
}

async function getAutoCompleteSearch(keyword) {
    try {
        const resAutoCopmplete = await axios.get(`${BASE_URL}locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${keyword}`)
        const data = resAutoCopmplete?.data ? utilService.organizeAutoCompleteData(resAutoCopmplete?.data) : []
        if (data.length) return data
        return Promise.reject('Please try another search key!')
    } catch (err) {
        throw err
    }
}

