import { useState } from 'react'
import PostList from './components/PostList'
import { Provider } from 'react-redux'
import { store } from './store'

function App() {

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50">
        <PostList/>
      </div>
    </Provider>
  )
}

export default App
