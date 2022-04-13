import { Link } from "react-router-dom"
import { useState } from "react"
import "./Header.scss"

export const Header = () => {
    const [currentTab, setCurrentTab] = useState('home')


    const toggleCurrentTab = (tab) => {
        setCurrentTab(tab)
    }

    return (
        <header className="header">
            <div className="header-logo">
                <h1>Herolo Weather App</h1>
            </div>
            <div className="nav-container">
                <nav className="menu">
                    <Link onClick={() => toggleCurrentTab('home')} className={currentTab === "home" ? "home-tab" : ""} to="/">Home</Link>
                    <Link onClick={() => toggleCurrentTab('favorites')} className={currentTab === "favorites" ? "favorites-tab" : ""} to="/favorites">Favorites</Link>
                </nav>
            </div>
        </header>
    )
}
