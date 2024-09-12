import styles from './Usuario.module.css'

import { useParams } from 'react-router-dom'

import { useContext, useEffect, useState } from 'react'

import Container from '../layout/Container'

import CadFormBen from '../cadastro/CadFormBen'

import CadFormEmp from '../cadastro/CadFormEmp'

import CadFormPrest from '../cadastro/CadFormPrest'

import { AuthContext } from '../auth/Authrapper'

function Usuario({ tipo }){

    const { id } = useParams()

    const {token} = useContext(AuthContext);

    const [ usuario, setUsuario ] = useState([])

    const [ noViewEdit, setViewEdit ] = useState(false)

    const typeForm = usuario.tipo

    useEffect(() => {

        fetch(`http://localhost:8080/${tipo}/${id}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        }).then(resp => resp.json())
        .then((data) => {
            setUsuario(data)
        })
        .catch((err) => window.alert(err))
    }, [id])

    function toggleUserForm() {
        setViewEdit(!noViewEdit)
    }

    /*function deleteuser( id ) {

        fetch(`http://localhost:5000/usuarios/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(resp => resp.json())
        .then((data) => {
            console.log(data)
        }).catch(err => console.log(err))
    }*/

    function editarusuario(usuario) {
        
        fetch(`http://localhost:8080/${tipo}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(usuario),
        })
        .then(resp => resp.json())
        .then((data) => {
            setUsuario(data)
            setViewEdit(false)

        })
        .catch(err => window.alert(err))
    }
    return(
        <>
        {usuario.nome || usuario.nome || usuario.nome ? (
        <Container>
            <div className={styles.detalhes_usuario}>
                <h1>{usuario.nome}</h1>
                <button className={styles.buttonedit} onClick={toggleUserForm}>
                    {!noViewEdit ? 'Editar dados do usuário' : 'Fechar'}
                </button>
                <p>Inscrito em: <input className={styles.inptdt} type='date' value={usuario.dt_inscricao} disabled/><br></br><br></br></p>
                {!noViewEdit ? (
                    <>
                        {usuario.tipo === 'Beneficiario' && (
                            <div className={styles.divisoria}>
                                <div className={styles.esq}>
                                    {usuario.nomesocial && <h2>{usuario.nomesocial}</h2>}
                                    {usuario.tp_ben && <p><span>{usuario.tipo}</span> - {usuario.tp_ben}</p>}
                                    <p><span>Nascimento:</span> {usuario.nasc}</p>
                                    {usuario.email && <p><span>Email:</span> {usuario.email}</p>}
                                    {usuario.cel && <p><span>Tel:</span> {usuario.cel}</p>}
                                    {usuario.cpfval && <p><span>CPF:</span> {usuario.cpfval}</p>}
                                    {usuario.rg && <p><span>Identidade:</span> {usuario.rg}</p>}
                                    {usuario.estadocivil === 'S' && <p><span>Estado Civil:</span> Solteiro(a)</p>}
                                    {usuario.estadocivil === 'C' && <p><span>Estado Civil:</span> Casado(a)</p>}
                                    {usuario.estadocivil === 'V' && <p><span>Estado Civil:</span> Viúvo(a)</p>}
                                    {usuario.escolaridade && <p><span>Escolaridade:</span> {usuario.escolaridade}</p>}
                                    {usuario.nmpai && <p><span>Pai:</span> {usuario.nmpai}</p>}
                                    {usuario.nmmae && <p><span>Mãe:</span> {usuario.nmmae}</p>}
                                </div>
                                {usuario.endr && <div className={styles.dir}><h3><br></br><span>Endereço</span></h3>
                                    {usuario.endr && <p>{usuario.endr} {usuario.bairro && ` - ${usuario.bairro}`}</p>}
                                    {usuario.comp && <p>{usuario.comp}<br></br><br></br></p>}
                                    {usuario.cdd && <p className={styles.localcdd}>{usuario.cdd} {usuario.uf && ` - ${usuario.uf}`}</p>}
                                </div>
                                }
                            </div>
                        )}
                        {usuario.tipo === 'Prestador' && (
                            <div>
                                {usuario.nomeusual && <h2>{usuario.nomeusual} {usuario.sexo && ` - ${usuario.sexo}`}</h2>}
                                {usuario.tppessoa && <p><span>{usuario.tipo}</span> - Pessoa {usuario.tppessoa}</p>}
                                {usuario.contrato && <p><span>Contrato:</span> #{usuario.contrato}</p>}
                                {usuario.email && <p><span>Email:</span> {usuario.email}</p>}
                                {usuario.cel && <p><span>Tel:</span> {usuario.cel}</p>}
                                {usuario.cpfval && <p><span>CPF:</span> {usuario.cpfval}</p>}
                                {usuario.cnpjval && <p><span>CNPJ:</span> {usuario.cnpjval}</p>}
                                <p><span>Data de ativação:</span> {usuario.atv} {usuario.desl && ` - Dt_desligamento: ${usuario.desl}`}</p>
                                {usuario.mtvdesl && <p><span>Mot. Desligamento:</span> {usuario.mtvdesl}</p>}
                                {usuario.estadocivil === 'S' && <p><span>Estado Civil:</span> Solteiro(a)</p>}
                                {usuario.estadocivil === 'C' && <p><span>Estado Civil:</span> Casado(a)</p>}
                                {usuario.estadocivil === 'V' && <p><span>Estado Civil:</span> Viúvo(a)</p>}
                            </div>
                        )}
                        {usuario.tipo === 'Empresa' && (
                            <div>
                                {usuario.fantjur && <h2>{usuario.fantjur} - {usuario.nomerep}</h2>}
                                {usuario.cnpjval && <p><span>CNPJ:</span> {usuario.cnpjval}</p>}
                                {usuario.emailjur && <p><span>Email:</span> {usuario.emailjur}</p>}
                                {usuario.endrjur && <p>{usuario.endrjur} {usuario.bairrojur && ` - ${usuario.bairrojur}`}</p>}
                                {usuario.compjur && <p>{usuario.compjur}</p>}
                                {usuario.cddjur && <p>{usuario.cddjur} {usuario.uf && ` - ${usuario.uf}`}</p>}
                                {usuario.recad && <p><span>{usuario.recad}</span><br></br><br></br></p>}
                                {usuario.ativo === 'S' && <p className={styles.atv}>Ativo</p>}
                                {usuario.ativo === 'N' && <p className={styles.inatv}>Inativo</p>}
                            </div>
                        )}
                    </>
                ) : (
                    <div>
                        <div className={styles.tot_div_lateral_dir}>
                            {typeForm === 'Beneficiario' &&  <CadFormBen handleSubmit={editarusuario} usuarioData ={usuario} textoBotao='Editar Beneficiário'/>}
                            {typeForm === 'Empresa' &&  <CadFormEmp handleSubmit={editarusuario} usuarioData ={usuario} textoBotao='Editar Empresa'/>}
                            {typeForm === 'Prestador' &&  <CadFormPrest handleSubmit={editarusuario} usuarioData ={usuario} textoBotao='Editar Prestador'/>}
                        </div>
                    </div>
                )}
            </div>
        </Container>
        ) : (
            <p>Neyloading...</p>
        )}
        </>
    )
}

export default Usuario