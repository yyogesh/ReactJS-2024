import { forwardRef, Ref } from "react"

interface ButtonProps {
  children: React.ReactNode
}

const Button = forwardRef((props: ButtonProps, ref: Ref<HTMLButtonElement>) => {
    return (
      <button ref={ref}>
          {props.children}
      </button>
    )
  })

export default Button