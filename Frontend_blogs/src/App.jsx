
import Footer from './components/Footer'
import Header from './components/Header'
import Landing from './components/landing/landing'
import { BrowserRouter, Routes } from 'react-router-dom'



function App() {

  return (
    <BrowserRouter>

     <Header/>
    <Landing/>
     <Footer/>
     <Routes>
      
     </Routes>
    </BrowserRouter>
  )
}

export default App
