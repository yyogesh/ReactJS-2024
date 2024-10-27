import './App.css'
import { ErrorBoundry } from './components/ErrorBoundry'
import ErrorDisplay from './components/ErrorDisplay'
import ExampleComponent from './components/ExampleComponent'
import HocExample from './components/HocExample'
import { ErrorProvider } from './contexts/ErrorContext'

function App() {

  return (
    <>
    <ErrorProvider>
       <ErrorBoundry>
        <div className="min-h-screen bg-gray-100">
          <ErrorDisplay/>
          <ExampleComponent/>
          <HocExample/>
        </div>
       </ErrorBoundry>
    </ErrorProvider>
    </>
  )
}

export default App
