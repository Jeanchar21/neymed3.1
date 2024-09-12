import { Link } from 'react-router-dom'
import styles from './LinhaUsuario.module.css'

function LinhaUsuario({ id,
                        nome,
                        nomesocial,
                        nomeusual,
                        tipo, 
                        dt_inscricao,
                        cpfval,
                        cnpjval,
                        tppessoa,
                        tp_ben,
                        nasc,
                        atv,
                        fantjur,
                        nomerep,
                        ativo }) {
    return (
        <>
        {tipo === 'Beneficiario' && (
            <div className={styles.linhausuario}>
                <Link to={`/beneficiario/${id}`}>
                {nomesocial && <h2>{nomesocial}</h2>}
                <div className={styles.linha_div}><h4>{nome}</h4> <p>Inscrito em: <input className={styles.dt_inscri} type='date' value={dt_inscricao} disabled/></p></div>
                {tp_ben && <h5>{tipo} - {tp_ben}</h5>}
                {cpfval && nasc && <h5>CPF: {cpfval} /// Nascimento: {nasc}</h5>}
                </Link>
            </div>
        )}
        {tipo === 'Prestador' && (
            <div className={styles.linhausuario}>
                <Link to={`/prestador/${id}`}>
                {nomeusual && <h2>{nomeusual}</h2>}
                <div className={styles.linha_div}><h4>{nome}</h4> <p>Inscrito em: <input className={styles.dt_inscri} type='date' value={dt_inscricao} disabled/></p></div>
                {tppessoa && <h5>{tipo} - Pessoa {tppessoa}</h5>}
                {cpfval && <h5>CPF: {cpfval} /// data de ativação: {atv}</h5>}
                {cnpjval && <h5>CNPJ: {cnpjval} /// data de ativação: {atv}</h5>}
                </Link>
            </div>
        )}
        {tipo === 'Empresa' && (
            <div className={styles.linhausuario}>
                <Link to={`/empresa/${id}`}>
                {fantjur && <h2>{fantjur} - {nomerep}</h2>}
                <div className={styles.linha_div}><h4>{nome}</h4> <p>Inscrito em: <input className={styles.dt_inscri} type='date' value={dt_inscricao} disabled/></p></div>
                {ativo === 'S' && <h5>{tipo} - <input className={styles.ativs} type='text' value='ativo' disabled/></h5>}
                {ativo === 'N' && <h5>{tipo} - <input className={styles.ativn} type='text' value='inativo' disabled/></h5>}
                {cnpjval && <h5>CNPJ: {cnpjval}</h5>}
                </Link>
            </div>
        )}
        </>
    )
}

export default LinhaUsuario