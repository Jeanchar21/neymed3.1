import { useState } from 'react'
import style from './CadForm.module.css'

function CadFormEmp({ handleSubmit, textoBotao, usuarioData }) {

    const isGoogleChrome = !!window.chrome;

    const [ usuario, setUsuario ] = useState(usuarioData || {})

    const submit = (e) => {
        e.preventDefault()

        if(!usuario.nome || usuario.nome.length < 3){
            window.alert('Nome jurídico inválido')

        }else if(!usuario.nomerep || usuario.nomerep.length < 3){
            window.alert('Nome  de representante inválido')
        }else if(!usuario.cnpjval && !validarcnpj(usuario.cnpjval)){
            window.alert('CNPJ inválido')
        }else{
            handleSubmit(usuario)
        }
    }

    function validarcnpj(cnpj){
        cnpj = cnpj.replace(/[^\d]+/g,'');
 
        if(cnpj === '')
            return false;
         
        if (cnpj.length !== 14)
            return false;
     
        // Elimina CNPJs invalidos conhecidos
        if (cnpj === "00000000000000" || 
            cnpj === "11111111111111" || 
            cnpj === "22222222222222" || 
            cnpj === "33333333333333" || 
            cnpj === "44444444444444" || 
            cnpj === "55555555555555" || 
            cnpj === "66666666666666" || 
            cnpj === "77777777777777" || 
            cnpj === "88888888888888" || 
            cnpj === "99999999999999")
            return false;
             
        // Valida DVs
        let tamanho = cnpj.length - 2
        let numeros = cnpj.substring(0,tamanho);
        let digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
          soma += numeros.charAt(tamanho - i) * pos--;
          if (pos < 2)
                pos = 9;
        }
        let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado !== digitos.charAt(0))
            return false;
             
        tamanho = tamanho + 1;
        numeros = cnpj.substring(0,tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
          soma += numeros.charAt(tamanho - i) * pos--;
          if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado !== digitos.charAt(1))
              return false;
               
        return true;
        
    }

    function handleChange(e) {
        setUsuario({ ...usuario, [e.target.id]: e.target.value })
    }

    function mascaracnpj(){
        let maskcnpj = document.querySelector('input#cnpjval')

        maskcnpj.addEventListener('input', (e) => {
        let validseq = maskcnpj.value.replace(/\D/g, '').substring(0,14)
        let seqcnpj = validseq.split("")
        let cnpjform = ""

        if (seqcnpj.length > 0){
            cnpjform += `${seqcnpj.slice(0,2).join("")}`
        }
        if (seqcnpj.length > 2)
        {
            cnpjform += `.${seqcnpj.slice(2,5).join("")}`
        }
        if (seqcnpj.length > 5)
        {
            cnpjform += `.${seqcnpj.slice(5,8).join("")}`
        }
        if (seqcnpj.length > 8)
        {
            cnpjform += `/${seqcnpj.slice(8,12).join("")}`
        }
        if (seqcnpj.length > 12)
        {
            cnpjform += ` - ${seqcnpj.slice(12,14).join("")}`
        }

        maskcnpj.value = cnpjform

        setUsuario({ ...usuario, [e.target.id]: e.target.value })
            
        })
    }

    function masktelefon() {

        let masktelemp = document.querySelector('input#celjur')

        masktelemp.addEventListener('input', (e) => {
            let validtel = masktelemp.value.replace(/\D/g, "").substring(0,11)
            let seqtel = validtel.split("")
            let telform = ""

            if(seqtel.length > 0){
                telform += `(${seqtel.slice(0,2).join("")}`
            }
            if(seqtel.length > 2){
                telform += `) ${seqtel.slice(2,7).join("")}`
            }
            if(seqtel.length > 7){
                telform += ` - ${seqtel.slice(7,11).join("")}`
            }

            masktelemp.value = telform

            setUsuario({ ...usuario, [e.target.id]: e.target.value })
        })
    }

    return(
        <div className={style.form_block}>
        <form onSubmit={submit} autoComplete={isGoogleChrome ? 'disabled' :  'off'}>
            <div className={style.elemento}>
                <div>
                    <label>Nome Empresa<br></br></label>
                    <input className={style.inputname} type='text' id='nome' placeholder='Insira o nome oficial da empresa' autoComplete="off" value={usuario.nome? usuario.nome : ''} onChange={handleChange} onSelect={(e) => {

                    setUsuario({ ...usuario, [document.querySelector('select#ativo').id]: document.querySelector('select#ativo').value })
                }}/>
                </div>
            </div>
            <div className={style.elemento}>
                <div>
                    <label>Nome fantasia<br></br></label>
                    <input className={style.inputsocialname} type='text' id='fantjur' placeholder='Nome popular'  autoComplete='none' value={usuario.fantjur? usuario.fantjur : ''} onChange={handleChange}/>
                </div>
            </div>
            <div className={style.elemento}>
                <div>
                    <label className={style.label}>Ativo<br></br></label>
                    <select className={style.inputoem} id='ativo' value={usuario.ativo? usuario.ativo : ''} onChange={handleChange}>
                        <option value='S'>Sim</option>
                        <option value='N'>Não</option>
                    </select>
                </div>
            </div>
            <div className={style.elemento}>
                <div>
                    <label>CNPJ<br></br></label>
                    <input className={style.inputcpf} type='text' id='cnpjval' placeholder='__.____.____ / ______'  autoComplete='none' value={usuario.cnpjval? usuario.cnpjval : ''} onInput={mascaracnpj}/>
                </div>
            </div>
            <div className={style.elemento}>
                <div>
                    <label><br></br>Representante<br></br></label>
                    <input className={style.inputname} type='text' id='nomerep' placeholder='Insira o nome do representante'  autoComplete='none' value={usuario.nomerep? usuario.nomerep : ''} onChange={handleChange}/>
                </div>
            </div>
            <div className={style.elemento}>
                <div>
                    <label><br></br>Email do Representante<br></br></label>
                    <input className={style.inputemail} type='text' id='emailjur' placeholder='suaempresa@gmail.com'  autoComplete='none' value={usuario.emailjur? usuario.emailjur : ''} onChange={handleChange}/>
                </div>
            </div>
            <div className={style.elemento}>
                <div>
                    <label><br></br>Endereço<br></br></label>
                    <input className={style.inputlog} type='text' id='endrjur' placeholder='Insira o endereço'  autoComplete='none' value={usuario.endrjur? usuario.endrjur : ''} onChange={handleChange}/>
                </div>
            </div>
            <div className={style.elemento}>
                <div>
                    <label><br></br>Complemento<br></br></label>
                    <input className={style.inputcomp} type='text' id='compjur' placeholder='Insira o complemento do endereço'  autoComplete='none' value={usuario.compjur? usuario.compjur : ''} onChange={handleChange}/>
                </div>
            </div>
            <div className={style.elemento}>
                <div>
                    <label><br></br>Bairro<br></br></label>
                    <input className={style.inputbairro} type='text' id='bairrojur' placeholder='Insira o bairro'  autoComplete='none' value={usuario.bairrojur? usuario.bairrojur : ''} onChange={handleChange}/>
                </div>
            </div>
            <div className={style.elemento}>
                <div>
                    <label><br></br>Cidade<br></br></label>
                    <input className={style.inputcdd} type='text' id='cddjur' placeholder='Insira a cidade'  autoComplete='none' value={usuario.cddjur? usuario.cddjur : ''} onChange={handleChange}/>
                </div>
            </div>
            <div className={style.elemento}>
                <div>
                    <label className={style.label}><br></br>UF<br></br></label>
                    <select className={style.selectuf} id='uf' value={usuario.uf? usuario.uf : ''} onChange={handleChange}>
                        <option value="none"></option>
                        <option value="RO">RO</option>
                        <option value="AC">AC</option>
                        <option value="AM">AM</option>
                        <option value="RR">RR</option>
                        <option value="PA">PA</option>
                        <option value="AP">AP</option>
                        <option value="TO">TO</option>
                        <option value="MA">MA</option>
                        <option value="PI">PI</option>
                        <option value="CE">CE</option>
                        <option value="RN">RN</option>
                        <option value="PB">PB</option>
                        <option value="PE">PE</option>
                        <option value="AL">AL</option>
                        <option value="SE">SE</option>
                        <option value="BA">BA</option>
                        <option value="MG">MG</option>
                        <option value="ES">ES</option>
                        <option value="RJ">RJ</option>
                        <option value="SP">SP</option>
                        <option value="PR">PR</option>
                        <option value="SC">SC</option>
                        <option value="RS">RS</option>
                        <option value="MS">MS</option>
                        <option value="MT">MT</option>
                        <option value="GO">GO</option>
                        <option value="DF">DF</option>
                    </select>
                </div>
            </div>
            <div className={style.elemento}>
                <div>
                    <label><br></br>País<br></br></label>
                    <input className={style.inputpais} type='text' id='pais' placeholder='Insira o país'  autoComplete='none' value={usuario.pais? usuario.pais : ''} onChange={handleChange}/>
                </div>
            </div>
            <div className={style.elemento}>
                <div>
                    <label><br></br>Tipo Empresa<br></br></label>
                    <input className={style.inputdep} type='text' id='tpjur' placeholder='Insira o serviço'  autoComplete='none' value={usuario.tpjur? usuario.tpjur : ''} onChange={handleChange}/>
                </div>
            </div>
            <div className={style.elemento}>
                <div>
                    <label><br></br>Fone<br></br></label>
                    <input className={style.inputcel} type='text' id='celjur' placeholder='(      )  ________-_______'  autoComplete='none' value={usuario.celjur? usuario.celjur : ''} onInput={masktelefon}/>
                </div>
            </div>
            <div className={style.elemento}>
                <div>
                    <label className={style.label}><br></br>Relação de serviço<br></br></label>
                    <select className={style.inputrecadm} id='recad' value={usuario.recad? usuario.recad : ''} onChange={handleChange}>
                        <option>Selecione uma opção</option>
                        <option value='Reciprocidade'>Reciprocidade</option>
                        <option value='Administradora'>Administradora</option>
                    </select>
                </div>
            </div>
            <div className={style.di}>
                <button className={style.submitbtn} type= 'submit'>{textoBotao}</button>
            </div>
        </form>
        </div>
    )
}

export default CadFormEmp