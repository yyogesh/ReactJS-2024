import { useEffect, useState } from "react"
import TaskForm from "./components/TaskForm"
import TaskList from "./components/TaskList"
import { Task } from "./models/Task"

const getExistingTask = () => {
  const existingTasks = localStorage.getItem("tasks")
  if (existingTasks) {
    return JSON.parse(existingTasks) as Task[]
  }
  return [{id: 1, title: "first Task", completed: true}]
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(getExistingTask()) // state manage
  console.log('tasks', tasks)

  useEffect( () => {
    console.log('Component mounted');
  }, [])


  useEffect(() => { 
  //  const timer = setInterval(() => console.log('tick'), 1000);

   // return () => clearInterval(timer) //clean // unmounted
  }, [])


  useEffect( () => { // side-effect data fetching, subscrition
    console.log('Component mounted1');
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks]) // Dependency tracking

  const deleteTask = (id: number) => {
    console.log("deleteTask", id)
    setTasks(tasks.filter(task => task.id !== id))
  }
  
  const addTask = (title: string) => {
    console.log("title", title) // id index, timestamp, uuid
    const newTask: Task = { id: Date.now(), title, completed: false }

    // const existingTask = [...tasks];
    // existingTask.push(newTask);
    // setTasks(existingTask);

    // setTasks([newTask]) // state reset
    setTasks([...tasks, newTask])
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? {...task, completed: !task.completed} : task))
  }
  console.log('tasks', tasks)
  
  return (
    <>
      <main className="container shadow-md my-10 mx-auto max-w-2xl p-4">
        <h1 className="text-3xl font-bold text-center mb-8">Task Manager</h1>
        <TaskForm onAddTask={addTask}/>
        <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask}/>
      </main>
    </>
  )
}

export default App
