import { useState } from "react"
import TaskForm from "./components/TaskForm"
import TaskList from "./components/TaskList"
import { Task } from "./models/Task"

const getExistingTask = () => {
  const existingTasks = localStorage.getItem("tasks")
  if (existingTasks) {
    return JSON.parse(existingTasks) as Task[]
  }
  return [{id: 1, title: "asdf", completed: false}]
}

const deleteTask = (id: number) => {
  console.log("deleteTask", id)
}

const addTask = (title: string) => {
  console.log("title", title)
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(getExistingTask())
  console.log('tasks', tasks)
  return (
    <>
      <main className="container shadow-md my-10 mx-auto max-w-2xl p-4">
        <h1 className="text-3xl font-bold text-center mb-8">Task Manager</h1>
        <TaskForm onAddTask={addTask}/>
        <TaskList tasks={tasks} onDelete={deleteTask}/>
      </main>
    </>
  )
}

export default App
