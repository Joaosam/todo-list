import styles from "./Task.module.css";
import { Trash } from "phosphor-react";
import { useState } from "react";

type TaskProps = {
  descriptionTask: string;
  id: string;
  checkedTask: boolean;
  onDeleteTask: (idCurrentTask: string) => void;
  onCompleteTask: (idCurrentTask: string, isCheckedTask: boolean) => void;
};

export function Task({
  id,
  descriptionTask,
  checkedTask,
  onDeleteTask,
  onCompleteTask,
}: TaskProps) {
  const [check, setCheck] = useState(false);
  const validateCheckTask = checkedTask === true ? true : false;

  function toggleInput() {
    setCheck(!check);
    onCompleteTask(id, !check);
  }

  function handleDeleteTask() {
    onDeleteTask(id);
  }

  return (
    <div className={styles.container}>
      <div className={styles.task}>
        <div className={styles.content}>
          <input
            onClick={toggleInput}
            id={id}
            type="checkbox"
            checked={validateCheckTask}
            onChange={() => validateCheckTask}
          />
          <label htmlFor={id}></label>
          <div className={styles.descriptionTask}>
            <p className={checkedTask === true ? styles.checked : undefined}>
              {descriptionTask}
            </p>
          </div>
          <button onClick={handleDeleteTask} title="Apagar Tarefa">
            <Trash size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
