
import BlogDetails from './components/BlogDetails'
import Contact from './components/Contact'
import FavoritePage from './components/FavoritePage'
import Footer from './components/Footer'
import Header from './components/Header'
import Landing from './components/landing/landing'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProfileIndex from './components/Profile/ProfileIndex'
import Blogs from './components/Blogs'



function App() {

  return (
    <BrowserRouter>

     <Header/>
    
    <Routes>
        <Route path="/" element={<Landing/>} />
        {/* <Route path="/blogdetails" element={<BlogDetails />} /> */}
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path='/favorite' element={<FavoritePage />} />
        <Route path='contact' element={<Contact />} />
        <Route path='blog' element={<Blogs /> }/>
        <Route path='/user' element={<ProfileIndex/>} />
     
      
      </Routes>
     <Footer/>
    
    </BrowserRouter>
  )
}

export default App
