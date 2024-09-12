import { useContext, useState } from 'react'

import BarraLateral from '../cadastro/BarraLateralCad'

import CadFormEmp from '../cadastro/CadFormEmp'

import styles from './Cadusuario.module.css'

import { useNavigate } from 'react-router-dom'

import CadFormBen from '../cadastro/CadFormBen'

import CadFormPrest from '../cadastro/CadFormPrest'

import { AuthContext } from '../auth/Authrapper'

function Cadusuario() {

    const {token} = useContext(AuthContext)
    const [ typeForm, setTypeForm ] = useState('Beneficiario')
    const Navigate = useNavigate()



    const mudarForm = f =>{
        setTypeForm(f)
    }

    function criarusuario(usuario) {
        //new user
        let novadt = new Date()
        let ano = novadt.getFullYear();
        let mes = novadt.getMonth()+1

        if (mes < 10) {
            mes = '0' + mes
        }
        let dia = novadt.getUTCDate();
        if(dia < 10) {
            dia = '0' + dia
        }
        let dataatual = ano + "-" + mes + "-" + dia;
        usuario.dt_inscricao = dataatual
        usuario.tipo = typeForm
        let url = ""

        if (typeForm == 'Beneficiario'){
            url = "beneficiarios"
        } else if (typeForm == 'Empresa'){
            url = "empresas"
        }else if (typeForm == 'Prestador'){
            url = "prestadores"
        }
        
        fetch(`http://localhost:8080/${url}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(usuario),
        }).then((resp) => resp.json())
        .then((data) => {
            if(data.message != undefined){
                console.log(data)
                window.alert(data.message)
            }else{
            Navigate("/usuarios", { state: { mensagem: "Usuario cadastrado com sucesso" } })
            }
        })
        .catch(err => window.alert(err))
    }

    return(
        <div>
            <div className={styles.tot_div_lateral_esq}>
                <BarraLateral handleResult={mudarForm} />
            </div>
            <div className={styles.tot_div_lateral_dir}>
                {typeForm === 'Beneficiario' &&  <CadFormBen handleSubmit={criarusuario} textoBotao='Cadastrar Beneficiário' />}
                {typeForm === 'Empresa' &&  <CadFormEmp handleSubmit={criarusuario} textoBotao='Cadastrar Empresa' />}
                {typeForm === 'Prestador' &&  <CadFormPrest handleSubmit={criarusuario} textoBotao='Cadastrar Prestador' />}
            </div>
        </div>
    )
}

export default Cadusuario