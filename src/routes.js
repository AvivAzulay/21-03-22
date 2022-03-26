import { Favorites } from './views/Favorites/Favorites'
import { Home } from './views/Home/Home'

export const routes = [
    {
        path: '/',
        component: <Home />
    },
    {
        path: '/favorites',
        component: <Favorites />
    },
]
