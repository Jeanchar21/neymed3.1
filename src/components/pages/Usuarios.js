import { useLocation } from "react-router-dom"

import Mensagem from "../layout/Mensagem"

import Container from "../layout/Container"

import styles from './Usuarios.module.css'

import LinhaUsuario from "../layout/LinhaUsuario"

import { useState, useEffect, useContext } from "react"

import { AuthContext } from "../auth/Authrapper"

function Usuarios() {

    const [ usuarios , setUsuarios ] = useState([])

    const [ beneficiarios, setBeneficiarios ] = useState([])

    const [ empresas, setEmpresas ] = useState([])

    const [ prestadores, setPrestadores ] = useState([])

    const [ filter, setFilter ] = useState('')

    const [ beneficiario, setBeneficiario ] = useState(false)

    const [ empresa, setEmpresa ] = useState(false)

    const [ prestador, setPrestador ] = useState(false)

    const [ limits, setLimits ] = useState(2)

    const [ totalPage, setTotalPage ] = useState(0)

    const [ page, setPage ] = useState(0)

    const [ start, setStart ] = useState(0)

    const [ end, setEnd ] = useState(2)

    const { token } = useContext(AuthContext)

    const location = useLocation()
    let mensagem = ''
    if (location.state) {
        mensagem = location.state.mensagem
    }

    useEffect(() => {
        fetch('http://localhost:8080/beneficiarios',{
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        }).then((resp) => resp.json()).then((data) => setBeneficiarios(data)).catch((error) => console.log(error))
        fetch('http://localhost:8080/empresas',{
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        }).then((resp) => resp.json()).then((data) => setEmpresas(data)).catch((error) => console.log(error))
        fetch('http://localhost:8080/prestadores',{
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        }).then((resp) => resp.json()).then((data) => setPrestadores(data)).catch((error) => console.log(error))
    }, [])

    useEffect(() => {
        setUsuarios([...beneficiarios, ...empresas, ...prestadores])
    }, [beneficiarios])

    /*useEffect(() => {
        fetch('http://localhost:5000/usuarios',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((resp) => resp.json()).then((data) => {
            setUsuarios(data)
        })
        .catch((err) => console.log(err))
    }, []) */

    /*useEffect(()=> {
        console.log(`Bearer ${token}`)
    }, [usuarios])*/

    useEffect(()=> {
        setTotalPage(Math.ceil(usuarios.length/limits))
    }, [usuarios])

    useEffect(() => {
        setStart(page * limits)
    }, [page])

    useEffect(() => {
        setEnd(start + limits)
    }, [start])

    const previousPage = () => {
        
        if (page > 0){
        setPage(page - 1)
        }
    }

    const nextPage = () => {
        
        if (page < (totalPage - 1)){
        setPage(page + 1)
        }
    }

    const checktype = () => {

        let ben = []
        if(beneficiario == true){
            ben = usuarios.filter(p => p.tipo == 'Beneficiario')
        }

        let emp = []
        if(empresa == true){
            emp = usuarios.filter(p => p.tipo == 'Empresa')
        }

        let prest = []
        if(prestador == true){
            prest = usuarios.filter(p => p.tipo == 'Prestador')
        }

        let all = usuarios
        if(beneficiario == false && empresa == false && prestador == false)
            return all.filter(data => data.nome.toLowerCase().indexOf(filter) > -1);

        return [...ben, ...emp, ...prest].filter(data => data.nome.toLowerCase().indexOf(filter) > -1);
    }

    useEffect(()=> {
        setTotalPage(Math.ceil(checktype().length/limits))
    }, checktype())

    return(
        <div>
        <div className={styles.user_container}>
            <div className={styles.title_container}>
                {mensagem && <Mensagem tipo="sucesso" msg = {mensagem}/>}
                <h1>Usuarios do sistema</h1>
            </div>
            <div className={styles.barra_pesquisa}>
                <div className={styles.firstline}>
                    <label>Beneficiários</label><input type="checkbox" className={styles.radiobutton} onChange={(e) => {setBeneficiario(e.target.checked)}} /> <label>Empresas</label><input type="checkbox" className={styles.radiobutton} onChange={(e) => {setEmpresa(e.target.checked)}} /> <label>Prestadores</label><input type="checkbox" className={styles.radiobutton} onChange={(e) => {setPrestador(e.target.checked)}} />
                </div>
                <div>
                    <input className={styles.inputpesq} type="text" placeholder="Procurar por nome..." onChange={(e) => {setFilter(e.target.value.toLowerCase())}} />
                </div>
            </div>
            <Container customClass="start">
                {checktype().length > 0 &&
                    checktype().map((usuario) => (
                        <LinhaUsuario 
                        id={usuario.id}
                        key={usuario.chave}
                        tipo={usuario.tipo}
                        nome={usuario.nome}
                        dt_inscricao={usuario.dt_inscricao}
                        nomesocial = {usuario.nomesocial}
                        nomeusual = {usuario.nomeusual}
                        cpfval = {usuario.cpfval}
                        cnpjval = {usuario.cnpjval}
                        tppessoa = {usuario.tppessoa}
                        tp_ben = {usuario.tp_ben}
                        nasc = {usuario.nasc}
                        atv = {usuario.atv}
                        fantjur = {usuario.fantjur}
                        nomerep = {usuario.nomerep}
                        ativo = {usuario.ativo}/>
                    )).slice(start, end)}

                    {checktype().filter((data) => 
                        data.nome.toLowerCase().indexOf(filter) > -1).length === 0 && usuarios.length != 0 && (
                        <p>Este usuário não existe!</p>
                    )}

                    {usuarios.length === 0 && (
                        <p>Não há usuários no banco!</p>
                    )}

                    {checktype().filter((data) => 
                        data.nome.toLowerCase().indexOf(filter) > -1).length != 0 && usuarios.length != 0 && (
                        <p className={styles.btns}>
                            <button onClick={previousPage}>Anterior</button> {page + 1} <button onClick={nextPage}>Próxima</button>
                        </p>
                    )}

            </Container>
        </div>
        </div>
    )
}

export default Usuarios