import React from "react"
import { v1 } from "uuid"
import { TodoList } from "./components/TodoList"

import "./App.css"

export type FilterValuesType = "all" | "active" | "completed"

type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

const App = () => {
  // generation id for todoLists
  const todoListId1 = v1()
  const todoListId2 = v1()

  // state for todoLists
  let [todoLists, setTodolists] = React.useState<TodolistType[]>([
    { id: todoListId1, title: "What to learn", filter: "all" },
    { id: todoListId2, title: "What to buy", filter: "all" },
  ])

  // state for tasks of todoLists
  const [tasksObj, setTasks] = React.useState({
    [todoListId1]: [
      { id: v1(), title: "HTML", isDone: true },
      { id: v1(), title: "CSS", isDone: true },
      { id: v1(), title: "React", isDone: false },
    ],
    [todoListId2]: [
      { id: v1(), title: "Book", isDone: false },
      { id: v1(), title: "Apples", isDone: true },
      { id: v1(), title: "Bread", isDone: false },
    ],
  })

  // Add new task
  const addTask = (text: string, todolistId: string) => {
    const task = {
      id: v1(),
      title: text,
      isDone: false,
    }
    const tasks = tasksObj[todolistId]
    const newTasks = [task, ...tasks]
    tasksObj[todolistId] = newTasks
    setTasks({ ...tasksObj })
  }

  // remove task
  const removeTask = (id: string, todolistId: string) => {
    const tasks = tasksObj[todolistId]
    const filterTasks = tasks.filter((obj) => obj.id !== id)
    tasksObj[todolistId] = filterTasks
    setTasks({ ...tasksObj })
  }

  // change status (isDone)
  const changeStatus = (
    taskId: string,
    isDone: boolean,
    todolistId: string
  ) => {
    const tasks = tasksObj[todolistId]
    const task = tasks.find((t) => t.id === taskId)
    if (task) {
      task.isDone = isDone

      setTasks({ ...tasksObj })
    }
  }

  // changing the filter in the todoList (all | active | completed)
  const changeFilter = (value: FilterValuesType, todolistId: string) => {
    const totolist = todoLists.find((obj) => obj.id === todolistId)
    if (totolist) {
      totolist.filter = value
      setTodolists([...todoLists])
    }
  }

  // remove todoList
  const removeTodoList = (todolistId: string) => {
    const filterTodoList = todoLists.filter((obj) => obj.id !== todolistId)
    setTodolists(filterTodoList)
    delete tasksObj[todolistId]
    setTasks({ ...tasksObj })
  }

  return (
    <div className="App">
      {todoLists.map((obj) => {
        let taskForTodoList = tasksObj[obj.id]

        if (obj.filter === "active") {
          taskForTodoList = taskForTodoList.filter((t) => t.isDone === false)
        }
        if (obj.filter === "completed") {
          taskForTodoList = taskForTodoList.filter((t) => t.isDone === true)
        }

        return (
          <div key={obj.id}>
            <TodoList
              todolistId={obj.id}
              title={obj.title}
              tasks={taskForTodoList}
              filterTask={obj.filter}
              removeTask={removeTask}
              changeFilter={changeFilter}
              addTask={addTask}
              changeTaskStatus={changeStatus}
              removeTodoList={removeTodoList}
            />
          </div>
        )
      })}
    </div>
  )
}

export default App
