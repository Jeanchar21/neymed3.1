import { useEffect, useState } from 'react'
import styles from './TelaAtendimento.module.css'
import { Link, useNavigate } from 'react-router-dom'

function TelaAtendimento(){

    const [ paciente, setPaciente ] = useState({})
    const [ pacientes, setPacientes ] = useState([])
    const [ decision, setDecision ] = useState('Registrar')
    const [ ufilter, setUfilter ] = useState('')
    const Navigate = useNavigate()
    const [ salas, setSalas ] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/salas',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((resp) => resp.json()).then((data) => {
            setSalas(data);
            load(data);
        })
        .catch((err) => console.log(err))
    }, [])

    const load = (salas) => {
        fetch('http://localhost:5000/pacientes',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((resp) => resp.json()).then((data) => {
            setPacientes(data)
            let room_free = salas.filter(s => !data.map(p => p.sala).map(h => h?.id).includes(s.id))
            setSalas(room_free)
        })

        .catch((err) => console.log(err))
    }

    function handleChange(e){
        setPaciente({ ...paciente, [e.target.id]: e.target.value })
    }

    function handleSala(e) {
        setPaciente({ ...paciente, sala: {
            id: Number(e.target.value),
            simbol: e.target.options[e.target.selectedIndex].text,
        }})
        console.log(paciente)
    }

    const aviso = (e) => {
        if (e.target.id === 're'){
            setDecision('Registrar')
        }else if (e.target.id === 'edit'){
            setDecision('Editar')
        }
    }

    function cadastrarpac(paciente){

        paciente.alta = 'off'
    
    fetch('http://localhost:5000/pacientes', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(paciente),
        }).then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            Navigate("/painelpac")
        })
        .catch(err => console.log(err))
    }

    const submit = (e) => {
        e.preventDefault()
        cadastrarpac(paciente);
    }

    return(
        <div className={styles.interfaceate}>
            <h1>Atendimento</h1>

            <div className={styles.decisions}>
                <label>Registrar</label> <input type='radio' name='Reedit' id='re' onChange={aviso} defaultChecked/> <label>Editar</label> <input type='radio' name='Reedit' id='edit' onChange={aviso}/>
            </div>

            {decision === 'Registrar' && (<div className={styles.formate}>
                <form>
                    <div className={styles.inputstyl}>
                        <div>
                            <label>Nome do paciente<br></br></label>
                            <input className={styles.inputname} type='text' placeholder='Nome completo' autoComplete='off' id='nome' onChange={handleChange}/>
                        </div>
                    </div>
                    <div className={styles.inputstyl}>
                        <div>
                            <label>Sala<br></br></label>
                            <select className={styles.selectsala} onChange={handleSala}>
                                <option></option>
                                {salas.map((option) => (
                                    <option value={option.id} key={option.id}>
                                        {option.simbol}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className={styles.inputstyl}>
                        <div>
                            <label>Status<br></br></label>
                            <select className={styles.selectstts} id='status' onChange={handleChange}>
                                <option value='none'></option>
                                <option value='Em atendimento'>Em atendimento</option>
                                <option value='disponivel'>disponível</option>
                                <option value='Com visita'>Com visita</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.inputstyl}>
                        <div>
                            <label>Nome do médico<br></br></label>
                            <input className={styles.inputnmmedico} type='text' placeholder='Nome completo' autoComplete='off' id='nmedico' onChange={handleChange}/>
                        </div>
                    </div>
                    <div className={styles.divsubtn}>
                    <button type='submit' className={styles.subtn} onClick={submit}>Finalizar</button>
                    </div>
                </form>
            </div>)}
            {decision === 'Editar' && (
            <div className={styles.inputstyl2}>
                <div>
                    <label className={styles.tittle}>Buscar no painel<br></br></label>
                    <input className={styles.inputnamesearch} type='text' placeholder='Digite o nome do paciente' onChange={(e) => {setUfilter(e.target.value.toLowerCase())}}/>
                    <div className="list">
                        {pacientes.length > 0 && ufilter.length > 0 && 
                        pacientes.filter(data => data.nome.toLowerCase().indexOf(ufilter) > -1).map((paciente) => (
                            <Link to={`/pacientes/${paciente.id}`}><li className={styles.li}>{paciente.nome}</li></Link>
                        ))}
                        {pacientes.filter(data => data.nome.toLowerCase().indexOf(ufilter) > -1).length === 0 && ufilter.length > 0 && (
                            <li className={styles.li}>{ufilter} <span>(usuario inexistente)</span></li>
                        )}
                    </div>
                </div>
            </div>)}
        </div>
    )
}

export default TelaAtendimento