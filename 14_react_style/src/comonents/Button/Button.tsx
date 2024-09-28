import classes from './Button.module.css'
import './button.css'
import classNames from 'classnames'

const Button = () => {
    console.log('classes', classes)
  return (
    <div>
        <button className={classNames(classes.button, 'button', classes.button_active, {disabled: false})}>Button</button>
        <button className={classes.button_active}>Button</button>
        <button className="button">Button</button>
        <button className={`${classes.button_active} button`}>Button</button>
    </div>
  )
}

export default Button