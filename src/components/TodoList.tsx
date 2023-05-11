import React from "react"
import { FilterValuesType } from "../App"

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: TaskType[]
  filterTask: FilterValuesType
  todolistId: string
  removeTask: (id: string, todolistId: string) => void
  changeFilter: (value: FilterValuesType, todolistId: string) => void
  addTask: (text: string, todolistId: string) => void
  changeTaskStatus: (
    taskId: string,
    isDone: boolean,
    todolistId: string
  ) => void
  removeTodoList: (todolistId: string) => void
}

export const TodoList: React.FC<PropsType> = ({
  todolistId,
  title,
  tasks,
  filterTask,
  removeTask,
  changeFilter,
  addTask,
  changeTaskStatus,
  removeTodoList,
}) => {
  const [text, setText] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const onClickKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setError(null)

    if (e.key === "Enter") {
      onAddTask()
    }
  }

  const onAddTask = () => {
    if (text.trim() !== "") {
      addTask(text.trim(), todolistId)
      setText("")
    } else {
      setError("field is required")
    }
  }

  const onClickAll = () => changeFilter("all", todolistId)
  const onClickActive = () => changeFilter("active", todolistId)
  const onClickCompleted = () => changeFilter("completed", todolistId)
  const onRemoveTodoList = () => removeTodoList(todolistId)

  return (
    <div>
      <h3>
        {title}
        <button onClick={onRemoveTodoList}>x</button>
      </h3>
      <div>
        <input
          className={error ? "error" : ""}
          placeholder="add task..."
          value={text}
          onChange={onChangeInput}
          onKeyPress={onClickKeyPress}
        />
        <button onClick={onAddTask}>+</button>
        {error && <div className="error-message">{error}</div>}
      </div>
      <ul>
        {tasks.map((obj) => (
          <li key={obj.id} className={obj.isDone ? "is-done" : ""}>
            <input
              type="checkbox"
              onChange={(e) =>
                changeTaskStatus(obj.id, e.currentTarget.checked, todolistId)
              }
              checked={obj.isDone}
            />
            <span>{obj.title}</span>
            <button onClick={() => removeTask(obj.id, todolistId)}>x</button>
          </li>
        ))}
      </ul>
      <div>
        <button
          className={filterTask === "all" ? "active-filter" : ""}
          onClick={onClickAll}
        >
          All
        </button>
        <button
          className={filterTask === "active" ? "active-filter" : ""}
          onClick={onClickActive}
        >
          Active
        </button>
        <button
          className={filterTask === "completed" ? "active-filter" : ""}
          onClick={onClickCompleted}
        >
          Completed
        </button>
      </div>
    </div>
  )
}
