import LinkButton from "../layout/LinkButton"
import styles from './Home.module.css'

function Home() {
    return(
        <section className={styles.home_container}>
            <h1>Bem-vindo ao <span>Ney.mv</span></h1>
            <p>O sistema de cadastro da União Hospitalar <span>Neymed</span></p>
            <div className={styles.buttons}>
            <LinkButton to="/cadusuario" texto="Cadastrar Usuário" /> <LinkButton to={'/telaatendimento'} texto="Registrar / Atualizar atendimento" />
            </div>
        </section>
    )
}

export default Home