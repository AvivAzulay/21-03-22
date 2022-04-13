import { useSelector } from 'react-redux';
import { UserPreferences } from '../../components/UserPreferences/UserPreferences';
import { Forcast } from '../../components/Forcast/Forcast';
import { Search } from '../../components/Search/Search';
import { Error } from '../../components/Error/Error';
import './Home.scss'

export const Home = () => {
    const { error } = useSelector(state => state.appModule)

    return (
        <div className="home-container">
            <Search error={error} />
            <UserPreferences />
            <Forcast />
            {error && <Error error={error} />}
        </div>
    )
}
