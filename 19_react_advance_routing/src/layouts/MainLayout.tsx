import NavBar from '../components/NavBar'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <main className="container mx-auto p-4">
        <Outlet/>
      </main>
    </div>
  )
}

export default MainLayout