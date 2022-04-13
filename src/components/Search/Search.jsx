import { useDispatch } from 'react-redux'
import { useState } from 'react';
import { loadForcast, setError } from '../../store/actions/app.actions'
import { utilService } from '../../services/util.service'
import { appService } from '../../services/app.service'
import SearchIcon from '@mui/icons-material/Search';
import debounce from 'lodash.debounce'
import './Search.scss'

export const Search = ({ error }) => {

    const [searchResults, setSearchResults] = useState([])
    const [searchInput, setSearchInput] = useState('')

    const dispatch = useDispatch()

    const onAutoCompleteSearch = async ({ target }) => {
        try {
            const keyword = target?.value
            const isEnglish = utilService.isEnglish(keyword)
            if (!isEnglish) return;
            const result = await appService.getAutoCompleteSearch(keyword)
            setSearchResults(result)
        }
        catch (err) {
            setError(err)
        }

    }

    const setNewForcast = async (city) => {
        try {
            setSearchInput(city)
            if (error) dispatch(setError(null))
            dispatch(loadForcast({ keyword: city }));
            setSearchResults([])
        }
        catch (err) {
            setError(err)
        }
    }

    const searchNewForcast = (ev) => {
        const { target } = ev
        if (target.value.length < 3) setSearchResults([])
        if (ev.code === 'Enter' && target.value.length > 0) {
            setNewForcast(target.value)
            autoCompleteDebounced.cancel()
        }
    }

    const onAutoComplete = (ev) => {
        const { target } = ev
        if (target.value.length < 3) return
        autoCompleteDebounced(ev)
    }

    const autoCompleteDebounced = debounce(onAutoCompleteSearch, 400)

    return (
        <div className="search-container" >
            <input className={`search${searchResults.length > 0 ? " open" : ""}`} onKeyDown={searchNewForcast} onChange={onAutoComplete} placeholder="Search for a city" type="text" />
            <div className="screen" onClick={() => { setSearchResults([]) }}></div>
            <SearchIcon />

            {searchResults.length > 0 &&
                <ul className="search-results">
                    {searchResults.map(result => {
                        const { countryCode, key, city } = result
                        return (
                            <li onClick={(ev) => setNewForcast(city, ev)} key={key}> {countryCode} - {city}</li>
                        )
                    })}
                </ul>
            }
        </div>
    )
}
