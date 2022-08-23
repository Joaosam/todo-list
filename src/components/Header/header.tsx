import styles from './header.module.css'
import logo from '../../assets/Logo.svg'

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.img}>
        <img src={logo} alt="Logo Todo" />
      </div>
    </header>
  )
}