import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { onSaveFavorites, updateIsFavorite, updateForcast, setError } from '../../store/actions/app.actions'
import useLocalStorage from '../../services/customHooks/useLocalStorage'
import { utilService } from '../../services/util.service'
import { appService } from '../../services/app.service'
import DeleteIcon from '@mui/icons-material/Delete';
import './Favorites.scss'

export const Favorites = () => {
    const { KEY } = utilService
    const { isCelsius } = useSelector(state => state.appModule)
    const [favorites, setFavorites] = useLocalStorage(KEY, [])
    const { forcast } = useSelector(state => state.appModule)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!favorites.length) return
        updateCurrentForcast()
    }, [])

    const removeFromFavorites = (ev, idx) => {
        ev.stopPropagation()
        ev.preventDefault()

        let filteredFavorites = favorites.slice()
        let removedItem = filteredFavorites.splice(idx, 1)[0]

        setFavorites(filteredFavorites)
        dispatch(onSaveFavorites(filteredFavorites))
        forcast?.id === removedItem?.id && dispatch(updateIsFavorite())
    }

    const onUpdateForcast = (idx) => {
        const newForcast = favorites[idx]
        if (newForcast.id === forcast.id) return
        dispatch(updateForcast(newForcast))
    }

    const updateCurrentForcast = async () => {
        try {
            const prmsFavorites = favorites.map(async (favorite) => {
                try {
                    if (Date.now() - favorite.requsetDate >= 360000) {
                        let updatedForcast = await appService.getForcastByKey(favorite.id)
                        const { category, fiveDaysForcast, requsetDate, text } = updatedForcast

                        return {
                            ...favorite, category,
                            fiveDaysForcast,
                            requsetDate,
                            text,
                        }
                    }
                    return favorite
                }
                catch (err) {
                    setError(err)
                }
            })
            const newFavorites = await Promise.all(prmsFavorites)
            if (newFavorites[0]) setFavorites(newFavorites)
        }
        catch (err) {
            setError(err)
        }

    }

    const convertDegrees = (value) => {
        return isCelsius ? utilService.convertDegrees(value) : value
    }

    if (!favorites || !favorites?.length) return <h2 style={{
        textAlign: "center"
    }}> Please save forcast to favorites.</h2 >

    return (
        <div className="favorites">
            {favorites?.map((favorite, idx) => {
                const { city, category, fiveDaysForcast } = favorite
                const { day, night, temperature: { maximum, minimum } } = fiveDaysForcast[0]
                return (
                    <div className="card" key={idx}>
                        <Link to="/" onClick={() => onUpdateForcast(idx)}>
                            <img src={utilService.getLogoIconUrl(day, night)} alt="" />
                            <h3>{city}</h3>
                            <span className="degree-container">
                                {convertDegrees(minimum.value)}
                                {isCelsius ? '°C' : '°F'}
                                &nbsp;-&nbsp;
                                {convertDegrees(maximum.value)}
                                {isCelsius ? '°C' : '°F'}
                            </span>
                            <span className="category">{category}</span>
                            <DeleteIcon onClick={(ev) => removeFromFavorites(ev, idx)} />
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}
