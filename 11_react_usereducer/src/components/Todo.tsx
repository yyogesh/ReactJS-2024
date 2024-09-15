import React, { useReducer } from "react";

type Todo = { id: number; text: string; completed: boolean };

type TodoState = { todos: Todo[] };

type TodoAction =
    | { type: 'ADD_TODO'; payload: string }
    | { type: 'TOGGLE_TODO'; payload: number }
    | { type: 'REMOVE_TODO'; payload: number };

const initialState: TodoState = {
    todos: [],
};


const todoReducer = (state: TodoState, action: TodoAction) => {
    switch (action.type) {
        case "ADD_TODO":
            return {
                todos: [...state.todos, { id: Date.now(), text: action.payload, completed: false }],
            };
        case "TOGGLE_TODO":
            return {
                todos: state.todos.map((todo) =>
                    todo.id === action.payload
                        ? { ...todo, completed: !todo.completed }
                        : todo
                ),
            };
        case "REMOVE_TODO":
            return {
                todos: state.todos.filter((todo) => todo.id !== action.payload),
            };
        default:
            return state;
    }
}

export const TodoList: React.FC = () => {
    const [state, dispatch] = useReducer(todoReducer, initialState);
    const [input, setInput] = React.useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            dispatch({ type: 'ADD_TODO', payload: input.trim() });
            setInput('');
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Add a todo"
                />
                <button type="submit">Add</button>
            </form>
            <ul>
                {state.todos.map(todo => (
                    <li key={todo.id}>
                        <span
                            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                            onClick={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
                        >
                            {todo.text}
                        </span>
                        <button onClick={() => dispatch({ type: 'REMOVE_TODO', payload: todo.id })}>
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}