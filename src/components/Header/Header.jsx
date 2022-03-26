import "./Header.scss"
import { Link } from "react-router-dom"

export const Header = () => {
    return (
        <header className="header">
            <div className="header-logo">
                <h1>Herolo Weather App</h1>
            </div>
            <div className="nav-container">
                <nav className="menu">
                    <Link to="/">Home</Link>
                    <Link to="/favorites">Favorites</Link>
                </nav>
            </div>
        </header>
    )
}
