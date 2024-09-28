import { useReducer, useState } from 'react';
import './App.css'
import { TodoList } from './components/Todo';
import InterstionEffect from './components/InterstionEffect';

type CounterState = {
  count: number
}

const initialState: CounterState = {
  count: 0
}

type CounterAction =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "RESET" }



const counterReducer = (state: CounterState, action: CounterAction) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 }
    case "DECREMENT":
      return { count: state.count - 1 }
    case "RESET":
      return initialState
    default:
      return state
  }
}



function App() {
  //  const [state, setState] = useState();
  //  setState(prevCount => prevCount + 1)
  const [state, dispatch] = useReducer(counterReducer, initialState)

  const handleIncrementClick = () => dispatch({ type: "INCREMENT" })
  return (
    <>
      <p>Count: {state.count}</p>
      <button onClick={handleIncrementClick}>Increment</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>Decrement</button>
      <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>

      <hr />
      <TodoList />
      <hr />
      <InterstionEffect />
    </>
  )
}

export default App


// function sum(a, b) {
//   return a + b;
// }


// sum(10, 5)
// sum(undefined, {})

// var a = 10
// a = "asdf"
// a = null


// function sum1(a: number, b: number): number {
//   return a + b;
// }

// sum1(10, 5)
// sum1(undefined, {})


// {
//   name: string,
//   age: number
// }


// interface Person { // inheritance // enum
//   name: string,
//   age: number
// }

// type Person1 = {
//   name: string,
//   age: number
// }

// class, object,

// enum color {
//   red,
//   green,
//   blue
// }

// console.log(color.red);