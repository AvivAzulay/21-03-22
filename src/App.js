import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { loadForcast } from './store/actions/app.actions';
import { Header } from './components/Header/Header';
import { routes } from "./routes";

export const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { coords: { latitude, longitude } } = position
        dispatch(loadForcast({ geoLocation: { latitude, longitude } }));
      }, setDefaultLocation)
    }
    else setDefaultLocation()
  }, []);

  const setDefaultLocation = () => {
    dispatch(loadForcast({}))
  }

  return (
    <div className="App">
      <Header />
      <Routes>
        {routes.map(route => <Route key={route.path} element={route.component} path={route.path} />)}
      </Routes>
    </div>
  )
}

