const { Link, NavLink } = ReactRouterDOM



export function AppHeader() {
  
    const mailImg = "https://cdn.iconscout.com/icon/free/png-256/free-gmail-2981844-2476484.png?f=webp"
    const noteImg = "https://play-lh.googleusercontent.com/9bJoeaPbGTB8Tz_h4N-p-6ReRd8vSS-frZb2tmJulaGIoTKElKj3zpmcFJvnS96ANZP5=w240-h480-rw"
    return <header className="app-header">
        <Link to="/">
            <h3>MISS!</h3>
        </Link>
        <nav className="app-header-nav">
            <NavLink to="/" className="fa-solid fa-house" style={{color : '#69c96b'}}></NavLink>
            <NavLink to="/about" className="fa-regular fa-user" style={{color : '#69c96b'}}></NavLink>
            <NavLink to="/mail" > <img className="mail-icon" src={mailImg} alt="gmail" /></NavLink>
            <NavLink to="/note"> <img className="note-icon" src={noteImg} alt="note" /></NavLink>
        </nav>
    </header>
}
