import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Contactus from './Contactus'
import Layout from './Layout'
import NotFound from './NotFound'

const BrowserRouterExample = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element= {<Layout/>}>
                    <Route index element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contactus />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
                
            </Routes>
        </BrowserRouter>
    )
}

export default BrowserRouterExample