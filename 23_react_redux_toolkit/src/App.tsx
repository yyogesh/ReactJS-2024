import { Provider } from 'react-redux'
import './App.css'
import ProductList from './components/ProductList'
import { store } from './store'
import UserProfile from './components/UserProfile'
import Cart from './components/Cart'

function App() {

  return (
    <Provider store={store}>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <ProductList />
          </div>
          <div className='space-y-4'>
            <UserProfile/>
            <Cart/>
          </div>
        </div>
      </div>
    </Provider>
  )
}

export default App
