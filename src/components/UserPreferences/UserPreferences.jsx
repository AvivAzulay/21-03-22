import { useDispatch, useSelector } from 'react-redux';
import { updateIsCelsius, updateIsDarkMode } from '../../store/actions/app.actions';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio';
import './UserPreferences.scss'

export const UserPreferences = () => {

    const { isCelsius } = useSelector(state => state.appModule)
    const dispatch = useDispatch()

    const toggleAppDegrees = () => {
        dispatch(updateIsCelsius())
    }

    return (
        <div className="preferences">

            <FormControl>
                <FormLabel id="preferences-degree" >Degree type</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="preferences-degree"
                    defaultValue={isCelsius ? "°C" : "°F"}
                    name="preferences-degree-btns"
                    onChange={toggleAppDegrees}
                >
                    <FormControlLabel value="°C" control={<Radio />} label="°C" />
                    <FormControlLabel value="°F" control={<Radio />} label="°F'" />
                </RadioGroup>
            </FormControl>


        </div>
    )
}
