import { PlusCircle } from 'phosphor-react'
import { v4 as uuidv4 } from 'uuid';

import { Task } from '../Task/Task'
import { Info } from '../Info/Info'
import { ChangeEvent, useState, useEffect } from 'react'
import { TaskEmpty } from '../TaskEmpty/TaskEmpty'

import styles from './Input.module.css'

type InfoTasks = {
  name: string,
  id: string,
  isCompleted: boolean
}

export function Input() {
  const [nameTask, setNameTask] = useState('')
  const [tasks, setTasks] = useState<InfoTasks[]>([])

  let tasksLocalStorage:InfoTasks[] = [];

    if(window.localStorage.getItem('task'))
    tasksLocalStorage = JSON.parse(localStorage.getItem('task')??"");
    
    useEffect(() => {
      if(tasksLocalStorage.length!==0) 
      setTasks(tasksLocalStorage);
    },[]);


    useEffect(()=>{
      localStorage.setItem('task',JSON.stringify(tasks))
    },[tasks])

  function handleCreateTask() {

    const infoTasks = {
      name: nameTask, 
      id: uuidv4(), 
      isCompleted: false
    }
    setTasks([...tasks, infoTasks])
    setNameTask('')
  }

  function createNameTask(e: ChangeEvent<HTMLInputElement>) {
    setNameTask(e.target.value)
  }

  function completeTask(idCurrentTask: string, isCheckedTask: boolean) {
    const newListCheckedTaskOnlyTrue:InfoTasks[] = []
    tasks.map(task => {
      if (task.id === idCurrentTask) {
        task['isCompleted'] = isCheckedTask
      }
      newListCheckedTaskOnlyTrue.push(task)
    })
    setTasks(newListCheckedTaskOnlyTrue)
  }

  function deleteTask(idCurrentTask: string) {
    const newListDeletedTask = tasks.filter(task => task.id !== idCurrentTask)
    setTasks(newListDeletedTask)
  } 

  const isInputEmpty = nameTask.length === 0

  return (
    <div className={styles.container}>
      <div className={styles.inputTask}>
          <input 
            onChange={createNameTask} 
            type="text"
            placeholder="Adicione uma nova tarefa" 
            value={nameTask}
            />
          <button 
            disabled={isInputEmpty}
            onClick={handleCreateTask}
            title='Adicionar Tarefa'>Criar<PlusCircle size={16} weight='bold'/>         
          </button>
      </div>
      <Info
        tasks={tasks} />
      {tasks.length > 0 ? (
        tasks.map(task => (
          <Task
          key={task.id}
          id={task.id}
          descriptionTask={task.name}
          checkedTask={task.isCompleted}
          onCompleteTask={completeTask}
          onDeleteTask={deleteTask}
        />))
      ) : (<TaskEmpty />)}
    </div>
  )
}