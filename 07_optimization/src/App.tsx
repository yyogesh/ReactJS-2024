import './App.css'
import UseCallBackExample from './Components/UseCallBackExample';
import UseMemoExample from './Components/UseMemoExample';

function App() {
  return ( // Virtual dom
    <>
      <UseMemoExample/>
      <UseCallBackExample/>
    </>
  )
}

export default App
