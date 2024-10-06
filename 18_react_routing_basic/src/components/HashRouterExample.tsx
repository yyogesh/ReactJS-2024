import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Contactus from './Contactus'
import Layout from './Layout'
import NotFound from './NotFound'

const HashRouterExample = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path='/' element= {<Layout/>}>
                    <Route index element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contactus />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </HashRouter>
    )
}

export default HashRouterExample