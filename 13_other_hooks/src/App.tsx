import { useDeferredValue, useId, useState } from 'react'
import './App.css'
import SlowList from './components/SlowList';
import useCount from './hooks/useCount';

function App() {
  const [text, setText] = useState('');
  const defferredText = useDeferredValue(text);
  const count  = useCount();
  const passwordHintId = useId(); // uuid

  return (
    <>
     <p>count: {count}</p>
     <input aria-label='input' value={text} onChange={e => setText(e.target.value)} />
     <SlowList text={defferredText} />
     <label>
        Password:
        <input
          type="password"
          aria-describedby={passwordHintId}
        />
      </label>
      <p id={passwordHintId}>
        The password should contain at least 18 characters
      </p>
    </>
  )
}

export default App
