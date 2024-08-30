import { useEffect, useRef, useState } from 'react'
import './App.css'
import Button from './components/Button';
import CustomInput from './components/CustomInput';
import { ParentComponent } from './components/ParentChild';

export interface InputHandles {
  foucs: () => void;
  setValue: (v: string) => void;
}

function App() {
  // const [count, setCount] = useState(0);
  const divRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const countRef = useRef<number>(0);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const customInputRef = useRef<InputHandles>(null);

  useEffect(() => { // after first render
    if (divRef.current) {
      divRef.current.style.backgroundColor = 'red';
    }
    if (inputRef.current) {
      inputRef.current.focus(); // focus on input field when component mounts
    }
    console.log(buttonRef.current)
  }, [])

  const handleCount = () => {
    // setCount(pre => pre + 1)
    countRef.current += 1; // use ref to keep track of count
    console.log('count =' + countRef.current) // access count using ref

    if(customInputRef.current) {
      customInputRef.current.foucs(); // call custom function from ref
      customInputRef.current.setValue('Hello, Custom Input'); // call custom function from ref
    }
  }

  return (
    <>
      <div ref={divRef}>
        Div with Ref
      </div>

      <input aria-label='input' ref={inputRef} />

      <button onClick={handleCount}>Click {countRef.current}</button>
      <Button ref={buttonRef}>
        Click me
      </Button>

      <CustomInput ref={customInputRef}/>
      <ParentComponent/>
    </>
  )
}

export default App
