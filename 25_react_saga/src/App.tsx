import { Provider } from 'react-redux'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { ProductList } from './components/ProductList'
import { store } from './redux/store'

function App() {

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-100">
            <ProductList/>
          </div>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
