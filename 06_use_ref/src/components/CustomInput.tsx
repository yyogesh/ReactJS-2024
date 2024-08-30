import { forwardRef, useImperativeHandle, useRef } from "react"

const CustomInput = forwardRef((props, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    // useImperativeHandle(ref, () => ({
    //     focus: () => {
    //         inputRef.current?.focus()
    //     },
    //     setValue: (value: string) => {
    //         if(inputRef.current) {
    //             inputRef.current.value = value;
    //         }
    //     }
    // }), [])

    useImperativeHandle(ref, () => {
        return {
          focus() {
            inputRef.current?.focus();
          },
          setValue() {
            inputRef.current?.scrollIntoView();
          },
        };
      }, []);

    return (
        <input aria-label="input" ref={inputRef} />
    )
})

export default CustomInput