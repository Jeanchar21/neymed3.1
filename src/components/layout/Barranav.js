import { Link } from 'react-router-dom'
import Container from './Container'
import style from './Barranav.module.css'
import { useContext } from 'react'
import { AuthContext } from '../auth/Authrapper';



function Barranav() {
    const {isAuth, logout} = useContext(AuthContext);
    return (
        <nav className={style.barranav}>
            <Container>
                <ul className={style.list}>
                    <li className={style.item}>
                        <Link to="/">Home</Link>
                    </li>
                {isAuth === true && (<>
                    <li className={style.item}>
                        <Link to="/usuarios">Usuarios</Link>
                    </li>
                    <li className={style.item}>
                        <Link to="/painelpac">Painel</Link>
                    </li>
                    <li className={style.item}>
                        <Link to="/" onClick={logout}>Log out</Link>
                    </li>
                </>)}
                {isAuth === false &&(
                    <li className={style.item}>
                        <Link to="/login">Log in</Link>
                    </li>
                )}
                </ul>
            </Container>
        </nav>
    )
}

export default Barranav