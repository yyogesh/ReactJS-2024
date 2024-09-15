useState: declares a state variable that you can update directly -- rerender
useEffect: connects a component to an external system. mount(api call, dependencies, unmount)
useRef: declares a ref. You can hold any value in it, but most often it’s used to hold a DOM node.
useImperativeHandle: lets you customize the ref exposed by your component. This is rarely used : forwardRef
useMemo: lets you cache the result of an expensive calculation. -- optimization
useCallback: lets you cache a function definition before passing it down to an optimized component. -- optimization
useContext: reads and subscribes to a context.
useReducer declares a state variable with the update logic inside a reducer function