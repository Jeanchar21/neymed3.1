import { useState } from 'react'
import style from './CadForm.module.css'

function CadFormBen({ handleSubmit, textoBotao, usuarioData }) {
        
    const [ usuario, setUsuario ] = useState(usuarioData || {})

    const submit = (e) => {
        e.preventDefault()

        if(!usuario.nome || usuario.nome.length < 3){
            window.alert('Nome inválido!')
        }/*else if(!usuario.cpfval || !validarcpf(usuario.cpfval)){
            window.alert('CPF inválido!')
        }*/else if (!usuario.nasc || usuario.nasc === '' /*fazer uma validação de data - backend*/){
            window.alert('Data Inválida')
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

        function mascararg(){

            let maskrg = document.querySelector('input#rg')

            maskrg.addEventListener('input', (e) => {
                let validrg = maskrg.value.replace(/\D/g, "").substring(0,8)
        
                let seqrg = validrg.split("")
        
                let rgform = ""
        
                if (seqrg.length > 0){
                    rgform += `${seqrg.slice(0,2).join("")}`
                }
                if (seqrg.length > 2){
                    rgform += `.${seqrg.slice(2,5).join("")}`
                }
                if (seqrg.length > 5){
                    rgform += `.${seqrg.slice(5,8).join("")}`
                }
        
                maskrg.value = rgform

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

    return(
        <div className={style.form_block}>
        <form onSubmit={submit}>
            <div className={style.elemento}>
                <div>
                    <label>Nome<br></br></label>
                    <input className={style.inputname} type='text' id='nome' placeholder='Insira o nome completo' autoComplete='none' value={usuario.nome? usuario.nome : ''} onChange={handleChange}/>
                </div>
            </div>
            <div className={style.elemento}>
                <div>
                    <label>Nome Social<br></br></label>
                    <input className={style.inputsocialname} type='text' id='nomesocial' placeholder='Insira seu apelido' autoComplete='none' value={usuario.nomesocial? usuario.nomesocial : ''} onChange={handleChange}/>
                </div>
            </div>
            <div className={style.elemento}>
                <div>
                    <label>Nascimento<br></br></label>
                    <input className={style.inputdata} type='date' id='nasc' autoComplete='none' value={usuario.nasc? usuario.nasc : ''} onChange={handleChange}/>
                </div>
            </div>
            <div className={style.elemento}>
                <div>
                    <label>Sexo<br></br></label>
                    <select className={style.selectsexec} id='sexo' value={usuario.sexo? usuario.sexo : ''} onChange={handleChange} >
                        <option>Selecione uma opção</option>
                        <option value="Masculino" >Masculino</option>
                        <option value="Feminino">Feminino</option>
                        <option value="Outro">Outro</option>
                    </select>
                </div>
            </div>
            <div className={style.elemento}>
                <div>
                    <label><br></br>CPF<br></br></label>
                    <input className={style.inputcpf} type='text' id='cpfval' placeholder='____.____.____ - ___' value={usuario?.cpfval? usuario.cpfval : ''} onInput={mascaracpf} autoComplete='none' />
                </div>
            </div>
            <div className={style.elemento}>
                <div>
                    <label><br></br>Identidade<br></br></label>
                    <input className={style.inputrg} type='text' id='rg' placeholder='____.____.____' onInput={mascararg} autoComplete='none' value={usuario?.rg? usuario.rg : ''} />
                </div>
            </div>
            <div className={style.elemento}>
                <div>
                    <label className={style.label_maior}><br></br>Órgão Emissor<br></br></label>
                    <input className={style.inputoem} type='text' id='oem' autoComplete='none' value={usuario.oem? usuario.oem : ''} onChange={handleChange} />
                </div>
            </div>
            <div className={style.elemento}>
                <div>
                    <label className={style.label_maior}><br></br>UF emissor<br></br></label>
                    <select className={style.selectuem} id='ufemissor' value={usuario.ufemissor? usuario.ufemissor : ''} onChange={handleChange} >
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
                    <label><br></br>Estado Civil<br></br></label>
                    <select className={style.selectsexec} id='estadocivil' value={usuario.estadocivil? usuario.estadocivil : ''} onChange={handleChange} >
                        <option>Selecione uma opção</option>
                        <option value="S">Solteiro(a)</option>
                        <option value="C">Casado(a)</option>
                        <option value="V">Viúvo(a)</option>
                    </select>
                </div>
            </div>
            <div className={style.elemento}>
                <div>
                    <label><br></br>Escolaridade<br></br></label>
                    <select className={style.selectesc} id='escolaridade' value={usuario.escolaridade? usuario.escolaridade : ''} onChange={handleChange} >
                    <option>Selecione uma opção</option>
                    <option value="Ensino Fundamental">Ensino Fundamental</option>
                    <option value="Ensino Medio">Ensino Medio</option>
                    <option value="Ensino Superior">Ensino Superior</option>
                    <option value="Ensino Fundamental Incompleto">Ensino Fundamental Incompleto</option>
                    <option value="Ensino Medio Incompleto">Ensino Medio Incompleto</option>
                    <option value="Ensino Superior Incompleto">Ensino Superior Incompleto</option>
                    </select>
                </div>
            </div>
            <div className={style.elemento}>
                <div>
                    <label><br></br>Email<br></br></label>
                    <input className={style.inputemail} type='text' id='email' placeholder='seuemail@gmail.com' autoComplete='none' value={usuario.email? usuario.email : ''} onChange={handleChange} />
                </div>
            </div>
            <div className={style.elemento}>
                <div>
                    <label><br></br>Nome do pai<br></br></label>
                    <input className={style.inputnmpai} type='text' id='nmpai' placeholder='Insira o nome do pai' autoComplete='none' value={usuario.nmpai? usuario.nmpai : ''} onChange={handleChange} />
                </div>
            </div>
            <div className={style.elemento}>
                <div>
                    <label><br></br>Nome da mãe<br></br></label>
                    <input className={style.inputnmmae} type='text' id='nmmae' placeholder='Insira o nome da mãe' autoComplete='none' value={usuario.nmmae? usuario.nmmae : ''} onChange={handleChange} />
                </div>
            </div>
            <div className={style.elemento}>
                <div>
                    <label><br></br>Número de celular<br></br></label>
                    <input className={style.inputcel} type='text' id='cel' placeholder='(      )  ________-_______' onInput={mascaratel} autoComplete='none' value={usuario.cel? usuario.cel : ''} onChange={handleChange} />
                </div>
            </div>
            <div className={style.elemento}>
                <div>
                    <label><br></br>Logradouro<br></br></label>
                    <input className={style.inputlog} type='text' id='endr' placeholder='Insira o endereço' autoComplete='none' value={usuario.endr? usuario.endr : ''} onChange={handleChange} />
                </div>
            </div>
            <div className={style.elemento}>
                <div>
                    <label><br></br>Complemento<br></br></label>
                    <input className={style.inputcomp} type='text' id='comp' placeholder='Insira o complemento do endereço' autoComplete='none' value={usuario.comp? usuario.comp : ''} onChange={handleChange} />
                </div>
            </div>
            <div className={style.elemento}>
                <div>
                    <label><br></br>Bairro<br></br></label>
                    <input className={style.inputbairro} type='text' id='bairro' placeholder='Insira o bairro' autoComplete='none' value={usuario.bairro? usuario.bairro : ''} onChange={handleChange} />
                </div>
            </div>
            <div className={style.elemento}>
                <div>
                    <label><br></br>Cidade<br></br></label>
                    <input className={style.inputcdd} type='text' id='cdd' placeholder='Insira a cidade' autoComplete='none' value={usuario.cdd? usuario.cdd : ''} onChange={handleChange} />
                </div>
            </div>
            <div className={style.elemento}>
                <div>
                    <label className={style.label}><br></br>UF<br></br></label>
                    <select className={style.selectuf} id='uf' value={usuario.uf? usuario.uf : ''} onChange={handleChange} >
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
                    <input className={style.inputpais} type='text' id='pais' placeholder='Insira o país' autoComplete='none' value={usuario.pais? usuario.pais : ''} onChange={handleChange} />
                </div>
            </div>
            <div className={style.elemento}>
                <div>
                    <label><br></br>Dependência<br></br></label>
                    <input className={style.inputdep} type='text' id='dep' placeholder='Parentesco' autoComplete='none' value={usuario.dep? usuario.dep : ''} onChange={handleChange} />
                </div>
            </div>
            <div className={style.elemento}>
                <div>
                    <label><br></br>Tipo de beneficiário<br></br></label>
                    <select className={style.selecttp} id='tp_ben' value={usuario.tp_ben? usuario.tp_ben : ''} onChange={handleChange} >
                        <option>Selecione uma opção</option>
                        <option value="titular">Titular</option>
                        <option value="dependente">Dependente</option>
                        <option value="agregado">Agregado</option>
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

export default CadFormBen