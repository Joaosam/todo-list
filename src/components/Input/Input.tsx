import { DotsSix, PlusCircle } from "phosphor-react";
import { v4 as uuidv4 } from "uuid";

import { Task } from "../Task/Task";
import { Info } from "../Info/Info";
import { ChangeEvent, useState, useEffect } from "react";
import { TaskEmpty } from "../TaskEmpty/TaskEmpty";

import styles from "./Input.module.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

type InfoTasks = {
  name: string;
  id: string;
  isCompleted: boolean;
};

export function Input() {
  const [nameTask, setNameTask] = useState("");
  const [tasks, setTasks] = useState<InfoTasks[]>([]);

  let tasksLocalStorage: InfoTasks[] = [];

  if (window.localStorage.getItem("task"))
    tasksLocalStorage = JSON.parse(localStorage.getItem("task") ?? "");

  useEffect(() => {
    if (tasksLocalStorage.length !== 0) setTasks(tasksLocalStorage);
  }, []);

  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(tasks));
  }, [tasks]);

  function handleCreateTask() {
    const infoTasks = {
      name: nameTask,
      id: uuidv4(),
      isCompleted: false,
    };
    setTasks([...tasks, infoTasks]);
    setNameTask("");
  }

  function createNameTask(e: ChangeEvent<HTMLInputElement>) {
    setNameTask(e.target.value);
  }

  function completeTask(idCurrentTask: string, isCheckedTask: boolean) {
    const newListCheckedTaskOnlyTrue: InfoTasks[] = [];
    tasks.map((task) => {
      if (task.id === idCurrentTask) {
        task["isCompleted"] = isCheckedTask;
      }
      newListCheckedTaskOnlyTrue.push(task);
    });
    setTasks(newListCheckedTaskOnlyTrue);
  }

  function deleteTask(idCurrentTask: string) {
    const newListDeletedTask = tasks.filter(
      (task) => task.id !== idCurrentTask
    );
    setTasks(newListDeletedTask);
  }

  function handleOnDragEnd(result: any) {
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);
  }

  const isInputEmpty = nameTask.length === 0;

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
          title="Adicionar Tarefa"
        >
          Criar
          <PlusCircle size={16} weight="bold" />
        </button>
      </div>
      <Info tasks={tasks} />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <ul
              className={styles.tasks}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {tasks.length > 0 ? (
                tasks.map((task, i) => (
                  <Draggable key={task.id} draggableId={task.id} index={i}>
                    {(provided) => (
                      <li
                        className={styles.task}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {tasks.length > 1 && (
                          <DotsSix size={32} color="#545454" />
                        )}

                        <Task
                          id={task.id}
                          descriptionTask={task.name}
                          checkedTask={task.isCompleted}
                          onCompleteTask={completeTask}
                          onDeleteTask={deleteTask}
                        />
                      </li>
                    )}
                  </Draggable>
                ))
              ) : (
                <TaskEmpty />
              )}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
