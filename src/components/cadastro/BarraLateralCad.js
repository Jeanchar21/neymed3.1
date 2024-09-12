import styles from './BarraLateral.module.css'

function BarraLateralCad( mudform ) {
    return(
        <div>
            <div className={styles.title}><h1>Cadastro de usuário</h1></div>
            <div className={styles.painel_de_decisao}>
                <select className={styles.temp_select} defaultValue="Beneficiario" onChange={(e) => {
                    const selectedForm = e.target.value;
                    mudform.handleResult(selectedForm)
                }}>
                    <option value="Beneficiario">Beneficiário</option>
                    <option value="Empresa">Empresa</option>
                    <option value="Prestador">Prestador</option>
                </select>
            </div>
        </div>
    )
}

export default BarraLateralCad