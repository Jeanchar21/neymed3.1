import LinhaPac from '../layout/LinhaPac'
import styles from './PainelPac.module.css'
import { useEffect, useState } from 'react'

function PainelPac() {

    const [ pacientes, setPacientes ] = useState([])

    useEffect(() => {
        load();
        //setInterval( () => load(), 3000)
    }, [])

    const load = () => {
        fetch('http://localhost:5000/pacientes',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((resp) => resp.json()).then((data) => {
            setPacientes(data)
        })
        .catch((err) => console.log(err))
    }

    return(
    <div className={styles.interfacepac}>
        <div>
            <h1>Painel do paciente</h1>
        </div>
        <div className={styles.divtable}>
            <table>
                {pacientes.length > 0 && pacientes.filter(data => data.alta === 'off').length > 0 &&
                    (<thead>
                        <td className={styles.nome}>Nome do paciente</td>
                        <td className={styles.atendime}>Atendimento</td>
                        <td className={styles.sala}>Sala</td>
                        <td className={styles.status}>Status</td>
                    </thead>)}
                {pacientes.length > 0 &&
                    pacientes.filter(data => data.alta === 'off').sort((a, b) => {
                        if(a.id < b.id) {
                            return 1
                        }else{
                            if(b.id < a.id){
                                return -1
                            }else{
                                return 0
                            }
                        }
                    }).map((paciente) =>(
                        <LinhaPac
                        id={paciente.id}
                        key={paciente.id}
                        nome={paciente.nome}
                        atendime={paciente.atendime}
                        sala={paciente.sala.simbol}
                        status={paciente.status}
                        />
                ))}
            </table>
        </div>
    </div>)
}

export default PainelPac