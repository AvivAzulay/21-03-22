const KEY = 'FAVORITES'

export const utilService = {
    organizeData,
    convertDegrees,
    getFavoritesFromStorage,
    isEnglish,
    organizeAutoCompleteData,
    organizeForcastData,
    getLogoIconUrl,
    KEY
}

function convertDegrees(value) {
    return ~~((5 / 9) * (value - 32))
}

function getLogoIconUrl(day, night) {
    let value = day.icon
    let time = new Date().getHours()
    if (19 < time || time <= 6) value = night.icon
    if (value < 10) value = `0${value}`

    return `https://developer.accuweather.com/sites/default/files/${value}-s.png`
}

function getFavoritesFromStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}

function organizeData(forcast, location) {
    const {
        DailyForecasts,
        Headline
    } = forcast;

    return {
        id: location.Key,
        country: location.Country.EnglishName,
        city: location.LocalizedName,
        category: Headline.Category,
        text: Headline.Text,
        isFavorite: _isOnFavorites(location?.Key),
        requsetDate: new Date(DailyForecasts[0].Date).getTime(),
        fiveDaysForcast: DailyForecasts.map((dailyForcst) => {
            return (
                {
                    day: { icon: dailyForcst.Day.Icon },
                    night: { icon: dailyForcst.Night.Icon },
                    temperature: {
                        maximum: {
                            value: dailyForcst.Temperature.Maximum.Value,
                            unit: dailyForcst.Temperature.Maximum.Unit
                        },
                        minimum: {
                            value: dailyForcst.Temperature.Minimum.Value,
                            unit: dailyForcst.Temperature.Minimum.Unit
                        }
                    }
                }
            )
        }),

    }
}

function organizeForcastData(forcast, key) {
    const {
        DailyForecasts,
        Headline
    } = forcast;

    return {
        category: Headline.Category,
        text: Headline.Text,
        requsetDate: new Date(DailyForecasts[0].Date).getTime(),
        fiveDaysForcast: DailyForecasts.map((dailyForcst) => {
            return (
                {
                    day: { icon: dailyForcst.Day.Icon },
                    night: { icon: dailyForcst.Night.Icon },
                    temperature: {
                        maximum: {
                            value: dailyForcst.Temperature.Maximum.Value,
                            unit: dailyForcst.Temperature.Maximum.Unit
                        },
                        minimum: {
                            value: dailyForcst.Temperature.Minimum.Value,
                            unit: dailyForcst.Temperature.Minimum.Unit
                        }
                    }
                }
            )
        }),

    }
}

function organizeAutoCompleteData(searchResults) {
    return searchResults.map(result => {
        const {
            Country,
            Key,
            LocalizedName,
        } = result
        return {
            key: Key,
            city: LocalizedName,
            country: Country?.LocalizedName,
            countryCode: Country?.ID
        }
    })
}

function isEnglish(keyword) {
    const ENGLISH = /^[A-Za-z ]*$/
    return ENGLISH.test(keyword)
}

function _isOnFavorites(id) {
    const favorites = getFavoritesFromStorage(KEY)
    return favorites.some(favorite => favorite.id === id)
}