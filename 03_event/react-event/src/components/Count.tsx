import React, { useState } from 'react'

const Count = () => {
    const [count, setCount] = useState(0) // data state mentain // count // initial state 0
   // let count1 = 1;
    const handleCountClick = () => {
       setCount(count + 1) // update state // count + 1 // increment the count by 1 on button click // setCount // update the state // count // new state value // count + 1 // new state value // count // updated state value // count + 1 // updated state value // count // updated state value // count + 1 // updated state value // count // updated state value // count + 1 // updated state value // count // updated state value // count + 1 // updated state value // count // updated state value // count + 1 // updated state value // count // updated state value // count + 1 // updated state value // count // updated state value // count + 1 // updated state value // count // updated state value // count + 1 // updated state value // count // updated state value // count + 1 // updated state value // count // updated state value // count + 1 // updated state value // count
      // count1 = count1 +1;
       console.log('count = ' + count)
    }
    console.log('in program value of count = ' + count)
    return ( // render // Rerender
        <button onClick={handleCountClick}>Count : {count}</button>
    )
}

export default Count