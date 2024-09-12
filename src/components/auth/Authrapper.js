import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext();

export const Authrapper = ({children}) => {

    const [ token, setToken ] = useState(undefined)

    const Navigate = useNavigate()

    const [ isAuth, setIsAuth ] = useState(false)


const login = (tok) => {
    setToken(tok)
    if(tok !== undefined){
    setIsAuth(true)
    Navigate("/usuarios", { state: { mensagem: "Usuário logado com sucesso!" } })
    }
}

const logout = () => {
    setIsAuth(false)
    setToken(undefined)
}

return(
    <AuthContext.Provider value={{token, isAuth, login, logout}}>
        {children}
    </AuthContext.Provider>
)
}