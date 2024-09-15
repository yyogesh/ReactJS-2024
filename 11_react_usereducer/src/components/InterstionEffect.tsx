import { useEffect, useInsertionEffect, useLayoutEffect, useState } from "react"

const InterstionEffect = () => {
    const [color, setColor] = useState('red');

    useInsertionEffect(() => {
        console.log('useInsertionEffect call')
       const style = document.createElement('style');
       style.innerHTML = `
          .dynamic-text {
            color: ${color};
          }
       `;
       document.head.appendChild(style);

       return () => { // unmount
           document.head.removeChild(style);
       }
    }, [color])

    useEffect(() => {
        console.log('useEffect call')
    }, [])

    
    useLayoutEffect(() => {
        console.log('useLayoutEffect call')
    }, [])

    return (
        <>
            <p className="dynamic-text">This text color is dynamically set</p>
            <button onClick={() => setColor(color === 'red' ? 'blue' : 'red')}>
                Toggle Color
            </button>
        </>
    )
}

export default InterstionEffect