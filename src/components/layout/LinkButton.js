import { Link } from 'react-router-dom'
import styles from './LinkButton.module.css'

function LinkButton({ to, texto }) {
    return(
        <Link className={styles.btn} to={to}>
            {texto}
        </Link>
    )
}

export default LinkButton