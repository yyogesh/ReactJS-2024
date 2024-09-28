import { useSyncExternalStore } from "react";

// function x(() => {}) {
//     return () => {

//     }
// }

interface Store<T> { // subscribe is a function that has a variable listenter and listener is a function
    subscribe: (listener: () => void) => () => void
    getValue: () => T
    setValue: (value: T) => void
}


function createStore<T>(initialValue: T): Store<T> {
    let value = initialValue;
    let listeners: (() => void)[] = [];

    return {
        subscribe: (listener: () => void) => {
            listeners.push(listener);

            return () => {
                listeners = listeners.filter(l => l !== listener);
            }
        },
        getValue: () => value,
        setValue: (newValue: T) => {
            value = newValue;
            listeners.forEach(listener => listener());
        }
    }
}

const store = createStore(0);

const Counter = () => {
    const count = useSyncExternalStore(store.subscribe, store.getValue)
    return (
        <>
            <p className="text-xl">Count: {count}</p>
            <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => store.setValue(count + 1)}
            >
                Increment
            </button>
        </>
    )
}

export default Counter