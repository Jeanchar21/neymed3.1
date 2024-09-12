import { Link } from 'react-router-dom'
import styles from './LinhaPac.module.css'

function LinhaPac({ id, nome, sala, status }) {
    return(
        <tbody>
            <td className={styles.elementtable}>{nome}</td>
            <td className={styles.elementtable}>{String(id).padStart(4, '0')}</td>
            <td className={styles.elementtable}>{sala}</td>
            <td className={styles.elementtable}>{status}</td>
        </tbody>
    )
}

export default LinhaPac