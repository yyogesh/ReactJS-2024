import { useState } from "react"


interface TaskFormProps {
    onAddTask: (title: string) => void;
  }

const TaskForm = ({onAddTask}: TaskFormProps) => {
    const [title, setTitle] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if(title.trim()) {
            onAddTask(title.trim()) // parent function
            setTitle('')
        }
    }
    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="flex">
                <input
                    type="text"
                    aria-label="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Add a new task"
                    className="flex-grow px-4 py-2 text-gray-700 bg-gray-200 rounded-l-lg focus:outline-none focus:bg-white"
                />
                <button
                    className="text-white bg-blue-500 px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none"
                    type="submit">Add Task</button>
            </div>
        </form>
    )
}

export default TaskForm