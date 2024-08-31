import { useMemo, useState } from 'react';

function UseMemoExample() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  const [list, setList] = useState([1, 2, 3, 4, 5]);


  // Memoizing a computationally expensive calculation
  const expensiveCalculation = (num: number) => {
    console.log('Calculating...');
    for (let i = 0; i < 1000000000; i++) { }
    return num * 2;
  };

  const memoizedCalculation = useMemo(() => { // scaler value return 
    return expensiveCalculation(count)
  }, [count])

  // Memoizing an object to prevent unnecessary re-renders
  const user = useMemo(() => {
    return { name: 'John', age: 30 + count };
  }, [count]);

  const sortedList = useMemo(() => {
    console.log('Sorting list...');
    return [...list].sort((a, b) => b - a);
  }, [list])


  // Memoizing a filtered list based on text input
  const filteredList = useMemo(() => {
    console.log('Filtering list...');
    return list.filter(item => item.toString().includes(text));
  }, [list, text]);

  return ( // Virtual dom
    <>
      <div>
        <h2>Example 1: Expensive Calculation</h2>
        <p>Count: {count}</p>
        <p>{memoizedCalculation}</p>
        <button onClick={() => setCount(count + 1)}>Increment Count</button>
      </div>

      <div>
        <h2>Example 2: Memoized Object</h2>
        <p>User: {JSON.stringify(user)}</p>
      </div>

      <div>
        <h2>Example 3: Sorted List</h2>
        <p>Original List: {list.join(', ')}</p>
        <p>Sorted List: {sortedList.join(', ')}</p>
        <button onClick={() => setList([...list, Math.floor(Math.random() * 10)])}>Add Random Number</button>
      </div>

      <div>
        <h2>Example 4: Filtered List</h2>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Filter list"
        />
        <p>Filtered List: {filteredList.join(', ')}</p>
      </div>
    </>
  )
}

export default UseMemoExample
