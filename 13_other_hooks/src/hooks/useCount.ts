import { useDebugValue, useState } from "react";

const useCount = () => {
    const [count, setCount] = useState(0);

    setInterval(() => {
        setCount(count + 1);
    }, 4000);

    useDebugValue(count);
    return count
}

export default useCount