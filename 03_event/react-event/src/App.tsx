import './App.css'
import Count from './components/Count';
import UserForm from './components/UserForm';

const subject = ['Angualr', 'React', 'Vue']

function App() {

  const handleClick = () => {
    console.log('handleClick');
  }

  const handleItemClick = (subject: string) => {
    console.log(`Clicked subject: ${subject}`);
  }

  const handleKeyPpress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log('key press', event.key)
    if (event.key === 'Enter') {
      console.log('Enter key pressed')
    }
  }

  const handleMouseMove = (event: React.MouseEvent) => {
    console.log('mouse move', event.clientX, event.clientY)
    if (event.clientX > 100 && event.clientY > 100) {
      console.log('Mouse is inside the div')
    } else {
      console.log('Mouse is outside the div')
    }
  }

  return (
    <>
      <button onClick={handleClick}>Click me</button>
      <ul>
        {
          subject.map(subject => (
            <li onClick={() => {
              handleItemClick(subject)
              console.log('subject clicked', subject, subject)
            }} key={subject}>{subject}</li>
          ))
        }
      </ul>

      <input aria-label='input' onKeyDown={handleKeyPpress}/>
      <div onMouseMove={handleMouseMove} style={{height: 200, border: '1px solid'}}>
         test
      </div>
      <UserForm/>
      <Count/>
    </>
  )
}

export default App
