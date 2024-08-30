import { Task } from "../models/Task";


interface TaskItemProps {
  task: Task;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

const TaskItem = ({ task, onDelete, onToggle }: TaskItemProps) => {
  console.log(task, onDelete);
  return (
    <li className={`flex items-center justify-between p-3 mb-2 rounded-lg ${
      task.completed ? 'bg-green-100' : 'bg-gray-100'
    } transition-colors duration-300`}>
      <div className="flex items-center">
        <input type="checkbox" aria-label="completed"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="mr-3 form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out" />
        <span className={`${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
          {task.title}
        </span>
      </div>
      <button
        className="px-3 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
        onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  )
}

export default TaskItem