import { useState } from 'react'

import style from './CadForm.module.css'

function CadFormPrest({ handleSubmit, textoBotao, usuarioData }) {

    const [ usuario, setUsuario ] = useState(usuarioData || {})

    const submit = (e) => {
        e.preventDefault()
        console.log(usuario)
        if(!usuario.nome || usuario.nome.length < 3){
            window.alert('Nome inválido')
        }else if(!usuario.atv || usuario.atv === '' /*fazer uma validação de data - backend*/){
            window.alert('Data de ativação inválida')
        }else{
            handleSubmit(usuario)
        }
    }

    function validarcpf(cpf){
        cpf = cpf.replace(/[^\d]+/g,'');	
        if(cpf === '') return false;	
        // Elimina CPFs invalidos conhecidos	
        if (cpf.length !== 11 || 
            cpf === "00000000000" || 
            cpf === "11111111111" || 
            cpf === "22222222222" || 
            cpf === "33333333333" || 
            cpf === "44444444444" || 
            cpf === "55555555555" || 
            cpf === "66666666666" || 
            cpf === "77777777777" || 
            cpf === "88888888888" || 
            cpf === "99999999999")
                return false;		
        // Valida 1o digito	
        let add = 0;	
        for (let i=0; i < 9; i++)		
            add += parseInt(cpf.charAt(i)) * (10 - i);	
        let rev = 11 - (add % 11);	
            if (rev === 10 || rev === 11)		
                rev = 0;	
            if (rev !== parseInt(cpf.charAt(9)))		
                return false;		
        // Valida 2o digito	
        add = 0;	
        for (let i = 0; i < 10; i++)		
            add += parseInt(cpf.charAt(i)) * (11 - i);	
        rev = 11 - (add % 11);	
        if (rev === 10 || rev === 11)	
            rev = 0;	
        if (rev !== parseInt(cpf.charAt(10)))
            return false;	

            return true;
    }

    function handleChange(e) {
        setUsuario({ ...usuario, [e.target.id]: e.target.value })
        console.log(usuario)
    }

    function mascaracpf(){

        let maskcpf = document.querySelector('input#cpfval')

        maskcpf.addEventListener('input', (e) => {
            let validseq = maskcpf.value.replace(/\D/g, '').substring(0,11)
            let seqcpf = validseq.split("")
            let cpfform = ""
            if (seqcpf.length > 0){
             cpfform += `${seqcpf.slice(0,3).join("")}`
            }
            if (seqcpf.length > 3)
            {
             cpfform += `.${seqcpf.slice(3,6).join("")}`
            }
            if (seqcpf.length > 6)
            {
             cpfform += `.${seqcpf.slice(6,9).join("")}`
            }
            if (seqcpf.length > 9)
            {
             cpfform += ` - ${seqcpf.slice(9,11).join("")}`
            }
            maskcpf.value = cpfform

            setUsuario({ ...usuario, [e.target.id]: e.target.value })
     })
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

    function mascaratel(){

        let masktel = document.querySelector('input#cel')

        masktel.addEventListener('input', (e) => {
            let validtel = masktel.value.replace(/\D/g, "").substring(0,11)
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

            masktel.value = telform

            setUsuario({ ...usuario, [e.target.id]: e.target.value })
        })
    }

    const [ tipoPessoa, setTipoPessoa ] = useState(usuario.tppessoa || 'Fisica')

    return(
        <div className={style.form_block}>
        <form onSubmit={submit}>
            <div className={style.elemento}>
                <div>
                    <label>Nome <span></span><br></br></label>
                    <input className={style.inputname} type='text' id='nome' placeholder='Insira o nome completo' autoComplete='none' value={usuario.nome? usuario.nome : ''} onChange={handleChange}/>
                </div>
            </div>
            <div className={style.elemento}>
                <div>
                    <label>Nome Usual<br></br></label>
                    <input className={style.inputsocialname} type='text' id='nomeusual' placeholder='Insira seu apelido'  autoComplete='none' value={usuario.nomeusual? usuario.nomeusual : ''} onChange={handleChange}/>
                </div>
            </div>
            <div className={style.elemento}>
                <div>
                    <label>Email Principal<br></br></label>
                    <input className={style.inputemail} type='text' id='email' placeholder='seuemail@gmail.com'  autoComplete='none' value={usuario.email? usuario.email : ''} onChange={handleChange}/>
                </div>
            </div>
            <div className={style.elemento}>
                <div>
                    <label><br></br>Dt. Ativação<br></br></label>
                    <input className={style.inputdata} type='date' id='atv' value={usuario.atv? usuario.atv : ''} onChange={handleChange}/>
                </div>
            </div>
            <div className={style.elemento}>
                <div>
                    <label><br></br>Dt. Desligamento<br></br></label>
                    <input className={style.inputdata} type='date' id='desl' value={usuario.desl? usuario.desl : ''} onChange={handleChange}/>
                </div>
            </div>
            <div className={style.elemento}>
                <div>
                    <label><br></br>Motivo Desligamento<br></br></label>
                    <input className={style.inputcomp} type='text' id='mtvdesl' placeholder='--' value={usuario.mtvdesl? usuario.mtvdesl : ''} autoComplete='none' onChange={handleChange}/>
                </div>
            </div>
            <div className={style.elemento}>
                <div>
                    <label><br></br>Contrato<br></br></label>
                    <input className={style.inputdep} type='text' id='contrato' placeholder='Código' value={usuario.contrato? usuario.contrato : ''} autoComplete='none' onChange={handleChange}/>
                </div>
            </div>
            <div className={style.elemento}>
                <div>
                    <label><br></br>Tipo Pessoa<br></br></label>
                    <select className={style.selectsexec}  id='tppessoa' value={usuario.tppessoa? usuario.tppessoa : ''} onChange={(e) => {
                    const pessoaselecionada = e.target.value
                    setTipoPessoa(pessoaselecionada)

                    delete usuario.cpfval
                    delete usuario.cnpjval

                    setUsuario({ ...usuario, [e.target.id]: pessoaselecionada })
                }}>
                        <option value="Fisica">Física</option>
                        <option value="Juridica">Jurídica</option>
                    </select>
                </div>
            </div>
            {tipoPessoa === 'Fisica' && <div className={style.elemento}>
                <div>
                    <label><br></br>CPF<span></span><br></br></label>
                    <input className={style.inputcpf} type='text' id='cpfval' placeholder='____.____.____ - ___' value={usuario.cpfval? usuario.cpfval : ''} autoComplete='none' onInput={mascaracpf} onSelect={(e) => {

                    setUsuario({ ...usuario, [document.querySelector('select#tppessoa').id]: tipoPessoa })
                }} />
                </div>
            </div>}
            {tipoPessoa === 'Juridica' && <div className={style.elemento}>
                <div>
                    <label><br></br>CNPJ<span></span><br></br></label>
                    <input className={style.inputcpf} type='text' id='cnpjval'  placeholder='__.____.____ / ______' value={usuario.cnpjval? usuario.cnpjval : ''} autoComplete='none' onInput={mascaracnpj} />
                </div>
            </div>}
            <div className={style.elemento}>
                <div>
                    <label><br></br>Telefone Principal<br></br></label>
                    <input className={style.inputcel} type='text' id='cel' placeholder='(      )  ________-_______' value={usuario.cel? usuario.cel : ''} autoComplete='none' onInput={mascaratel}/>
                </div>
            </div>
            <div className={style.elemento}>
                <div>
                    <label><br></br>Estado Civil<br></br></label>
                    <select className={style.selectsexec} id='estadocivil' value={usuario.estadocivil? usuario.estadocivil : ''} onChange={handleChange}>
                        <option>Selecione uma opção</option>
                        <option value="S">Solteiro(a)</option>
                        <option value="C">Casado(a)</option>
                        <option value="V">Viúvo(a)</option>
                    </select>
                </div>
            </div>
            <div className={style.elemento}>
                <div>
                    <label><br></br>Sexo<br></br></label>
                    <select className={style.selectsexec} id='sexo' value={usuario.sexo? usuario.sexo : ''} onChange={handleChange}>
                        <option>Selecione uma opção</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Feminino">Feminino</option>
                        <option value="Outro">Outro</option>
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

export default CadFormPrest