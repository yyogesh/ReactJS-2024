import { memo, useCallback, useState } from "react";
import Todos from "./Todos";

const OptimizeTodos = memo(Todos);

const UseCallBackExample = () => {
    const [count, setCount] = useState(0);
    const [todos, setTodos] = useState<string[]>([]);

    const increment = () => {
        setCount((c) => c + 1);
    };

    // Without useCallback, ExpensiveChild would re-render on every parent render because the calculation function would be recreated each time.
    // The primary reason for using useMemo and useCallback is to optimize performance by preventing unnecessary re-renders of components.
    // In React, when a component re-renders, all of its child components re-render by default.
    // Memoizing a callback in React with useCallback() helps ensure the function's referential integrity and prevent these re-renders.
    const addTodo = useCallback(() => {
        setTodos((t) => [...t, "New Todo"]);
    }, [setTodos]);

    return (
        <>
            <OptimizeTodos todos={todos} addTodo={addTodo} />
            <hr />
            <div>
                Count: {count}
                <button onClick={increment}>+</button>
            </div>
        </>
    )
}

export default UseCallBackExample