import { forwardRef, useState, useImperativeHandle, useRef } from "react";

// Child Component
const ChildComponent = forwardRef((props, ref) => {
    const [count, setCount] = useState(0);
  
    useImperativeHandle(ref, () => ({
      increment() {
        setCount(count + 1);
      },
      getCount() {
        return count;
      }
    }));
  
    return <div>{count}</div>;
  });
  
  // Parent Component
  export const ParentComponent = () => {
    const childRef = useRef();
  
    const handleClick = () => {
      childRef.current?.increment();
    };
  
    return (
      <>
        <ChildComponent ref={childRef} />
        <button onClick={handleClick}>Increment</button>
      </>
    );
  };