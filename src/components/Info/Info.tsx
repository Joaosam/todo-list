import styles from './Info.module.css'

type InfoTasks = {
  name: string,
  id: string,
  isCompleted: boolean
}

type InfoProps = {
  tasks: InfoTasks[]
}

export function Info({ tasks }: InfoProps) {
  const lengthTasksChecked = tasks.filter(task => task.isCompleted === true)
  
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.create}>
          <p>Tarefas criadas <span>{tasks.length}</span></p>
        </div>

        <div className={styles.done}>
          <p>Concluídas <span>{lengthTasksChecked.length} de {tasks.length}</span></p>
        </div>
      </div>
    </div>
  )
}