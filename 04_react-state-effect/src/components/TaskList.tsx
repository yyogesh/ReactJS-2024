import { Task } from "../models/Task"
import TaskItem from "./TaskItem"

interface TaskListProps {
    tasks: Task[];
    onDelete: (id: number) => void;
}
// const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
const TaskList = ({ tasks, onDelete }: TaskListProps) => {
    // const { tasks } = props
    return (
        <>
            {
                tasks.map(task => (
                    <TaskItem key={task.id} task={task} onDelete={onDelete} />  // key prop is required for React to identify unique elements in the list
                ))
            }
        </>
    )
}

export default TaskList