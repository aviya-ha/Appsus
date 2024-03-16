const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {
  
    return <header className="app-header">
        <Link to="/">
            <h3>LOGO!</h3>
        </Link>
        <nav>
            <NavLink to="/" className="fa-solid fa-house" style={{color : '#69c96b'}}></NavLink>
            <NavLink to="/about" className="fa-regular fa-user" style={{color : '#69c96b'}}></NavLink>
            <NavLink to="/mail" className="fa-regular fa-envelope" style={{color : '#69c96b'}}></NavLink>
            <NavLink to="/note" className="fa-solid fa-note-sticky" style={{color : '#ffae3d'}}></NavLink>
        </nav>
    </header>
}
