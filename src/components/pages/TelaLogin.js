import { useContext, useEffect, useState } from 'react'
import styles from './TelaLogin.module.css'
import { AuthContext } from '../auth/Authrapper'

function TelaLogin(){

    const {isAuth, token, login} = useContext(AuthContext)

    const [ user, setUser ] = useState({})

    const [ tok, setTok ] = useState({})

    const loginM = (user) => {
        
        fetch('http://localhost:8080/auth/login', {
            method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(user),
    }).then((resp) => resp.json()).then((data) => {
            setTok(data)
        }).catch(err => {
            if(err.toString() === 'SyntaxError: Unexpected end of JSON input'){
                window.alert('Senha ou usuário incorreto(s)')
            }else{
                window.alert(err)
            }
        })
    }

    useEffect(() => {
        login(tok.token)
    }, [tok])

    function handleChange(e) {
        setUser({ ...user, [e.target.id]: e.target.value })
        console.log(user)
    }

    function handleSubmit(e){
        e.preventDefault()
        loginM(user)
    }

    return(
    <>
        <div className={styles.formLog}>
            <label className={styles.iconlog}><span>Ney</span>login~</label>
            <form onSubmit={handleSubmit}>
                <div className={styles.elemento}>
                    <div>
                        <label>Nome de usuario:<br></br></label>
                        <input className={styles.inputlogin} id='login' type="text" onChange={handleChange} autoComplete='none'></input>
                    </div>
                </div>
                <div className={styles.elemento}>
                    <div>
                        <label>Senha:<br></br></label>
                        <input className={styles.inputsenha} id='password' type="password" onChange={handleChange}></input>
                    </div>
                </div>
                <div className={styles.divbtn}>
                    <button className={styles.btnlog} >Entrar</button>
                </div>
            </form>
        </div>
    </>)
}

export default TelaLogin