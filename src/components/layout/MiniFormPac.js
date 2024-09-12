import { useEffect, useState } from 'react'
import styles from './MiniFormPac.module.css'

function MiniFormPac( {handlesubmit, handlealta, pacData, options} ){

    const [ pac, setPac ] = useState( {} )

    useEffect(() => {
        setPac(pacData)
    }, [pacData])

    const submit = (e) => {
        e.preventDefault()
        handlesubmit(pac)
    }

    function handleChange(e) {
        setPac({ ...pac, [e.target.id]: e.target.value })
    }

    function handleSala(e) {
        setPac({ ...pac, sala: {
            id: Number(e.target.value),
            simbol: e.target.options[e.target.selectedIndex].text
        }})
    }

    const altamente = () => {
        pac.alta = 'on'
        delete pac.sala
        handlealta(pac)
    }

    return(
        <div className={styles.alldivs}>
            <form onSubmit={submit}>
                        <div className={styles.inputstyl}>
                        <div>
                            <label>Sala<br></br></label>
                            <select className={styles.selectsala} id='sala' value={pac.sala?.id ? pac.sala?.id : ''} onChange={handleSala}>
                                <option></option>
                                {options.map((option) => (
                                    <option value={option.id} key={option.id}>{option.simbol}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className={styles.inputstyl}>
                                <div>
                                    <label>Status<br></br></label>
                                    <select className={styles.selectstts} id='status' value={pac.status? pac.status : ''} onChange={handleChange}>
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
                                    <input className={styles.inputnmmedico} type='text' placeholder='Nome completo' autoComplete='off' id='nmedico' value={pac.nmedico? pac.nmedico : ''} onChange={handleChange}/>
                                </div>
                            </div>
                            {pac.alta != 'on' && (
                                <div className={styles.divsubtn}>
                                <button type='submit' className={styles.subtn}>Editar</button> <button className={styles.subtn} onClick={altamente}>De alta</button>
                                </div>
                            )}
                            {pac.alta == 'on' && (
                                <div className={styles.divsubtn}>
                                <button className={styles.subtn}>Voltar</button>
                                </div>
                            )}
                </form>
            </div>
    )
}

export default MiniFormPac