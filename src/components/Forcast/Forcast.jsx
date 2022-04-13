import { useDispatch, useSelector } from 'react-redux';
import useLocalStorage from '../../services/customHooks/useLocalStorage';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { updateIsFavorite } from '../../store/actions/app.actions';
import { utilService } from '../../services/util.service';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './Forcast.scss'

export const Forcast = () => {
    const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"];
    const { KEY } = utilService

    const { forcast, isCelsius } = useSelector(state => state.appModule)
    const [favorites, setFavorites] = useLocalStorage(KEY, [])
    const dispatch = useDispatch()

    const onToggleFavorite = () => {
        const newForcast = { ...forcast, isFavorite: !forcast.isFavorite }
        const newFavorites = favorites.slice()
        if (newForcast.isFavorite) {
            newFavorites.push(newForcast)
            setFavorites(newFavorites)
        } else {
            const idx = favorites.findIndex(favorite => favorite.id === newForcast.id)
            newFavorites.splice(idx, 1)
        }
        setFavorites(newFavorites)
        dispatch(updateIsFavorite())
    }

    const convertDegrees = (value) => {
        return isCelsius ? utilService.convertDegrees(value) : value
    }

    if (!forcast) return <></>
    const { country, city, category, fiveDaysForcast, text, isFavorite } = forcast
    return (
        <div className="forcast">
            <div className="forcast-top">
                <div className="details">
                    <h2>{country} - {city}</h2>
                    <div className="favorite" onClick={onToggleFavorite}>
                        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        <span>
                            {isFavorite ? "Remove from favorite" : "Add to favorites"}
                        </span>
                        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </div>
                </div>
            </div>

            <div className="forcast-middle">
                {category && <h2>Weekly forecast: <span>{category}</span></h2>}
                <span className="forcast-text">{text}</span>
            </div>

            <div className="forcast-bottom">
                {fiveDaysForcast.map((dailyForcast, idx) => {
                    const { day, night, temperature: { minimum, maximum }
                    } = dailyForcast
                    return (
                        <div className="card" key={idx}>
                            <img src={utilService.getLogoIconUrl(day, night)} alt="" />
                            <div className="degrees-container">
                                <span> {convertDegrees(minimum.value)}{isCelsius ? '°C' : '°F'}</span>
                                &nbsp;-&nbsp;
                                <span>{convertDegrees(maximum.value)}{isCelsius ? '°C' : '°F'} </span>
                            </div>
                            <span className="day-text">{DAYS[new Date().getDay() + idx]}</span>
                        </div>)
                })}
            </div>
        </div >
    )
}
