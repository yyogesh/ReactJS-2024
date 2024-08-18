import { Task } from "../models/Task";


interface TaskItemProps {
    task: Task;
    onDelete: (id: number) => void;
}

const TaskItem = ({task, onDelete}: TaskItemProps) => {
    console.log(task, onDelete);
  return (
    <li>
         {task.title} 
        <button onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  )
}

export default TaskItem