import styles from './TaskEmpty.module.css'
import clipboard from '../../assets/Clipboard.svg'

export function TaskEmpty() {
  return (
    <div className={styles.container}>
      <div className={styles.task}>
        <div className={styles.imgTask}>
          <img src={clipboard} alt="Logo de uma prancheta" />
        </div>
        <div className={styles.description}>
          <p>Você ainda não tem tarefas cadastradas</p>
          <p>Crie tarefas e organize seus itens a fazer</p>
        </div>
      </div>
    </div>
  )
}