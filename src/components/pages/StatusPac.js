import { useEffect, useState } from 'react'
import styles from './StatusPac.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import MiniFormPac from '../layout/MiniFormPac'

function StatusPac(){

    const { id } = useParams()

    const [ paciente, setPaciente ] = useState([])

    const Navigate = useNavigate()

    const [ salas, setSalas ] = useState( [] )

    useEffect(() => {
        fetch('http://localhost:5000/salas',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((resp) => resp.json()).then((data) => {
            setSalas(data)
            load(data)
        })
        .catch((err) => console.log(err))
    }, [paciente])

    const load = (salas) => {
        fetch('http://localhost:5000/pacientes',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((resp) => resp.json()).then((data) => {
            console.log(paciente)
            let room_free = salas.filter(s => !data.filter(d => d.id !== paciente.id).map(p => p.sala).map(h => h.id).includes(s.id))
            setSalas(room_free)
        })
        .catch((err) => console.log(err))
    }

    useEffect(() => {

        fetch(`http://localhost:5000/pacientes/${id}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            },
        }).then(resp => resp.json())
        .then((data) => {
            setPaciente(data)

        })
        .catch((err) => console.log)
    }, [id])

    function editaratendime(paciente) {
        
        fetch(`http://localhost:5000/pacientes/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(paciente),
        })
        .then(resp => resp.json())
        .then((data) => {
            setPaciente(data)
            Navigate("/telaatendimento")

        })
        .catch(err => console.log(err))
    }

    function daralta(paciente) {
        
        fetch(`http://localhost:5000/pacientes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(paciente),
        })
        .then(resp => resp.json())
        .then((data) => {
            setPaciente(data)
            Navigate("/telaatendimento")

        })
        .catch(err => console.log(err))
    }

    return(
        <div className={styles.interfacepac}>
            <h1>Tela do paciente</h1>
            <h2>{paciente.nome}{paciente.alta === 'on' && (<span>Em alta</span>)}</h2>
            <MiniFormPac handlesubmit={editaratendime} handlealta={daralta} pacData={paciente} options={salas}/>
        </div>
    )
}

export default StatusPac