import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'

import { NavBar } from './components/NavBar.jsx'
import { Home } from './components/Home.jsx'
import { About } from './components/About.jsx'
import { Blog } from './components/Blog.jsx'
import { CharacterGallery } from './components/CharacterGallery.jsx'
import { Login } from './components/Login.jsx'

import './assets/App.css'

const App = () => {
  const [user, setUser] = useState(null)
  
  let currentPage = <Home/>
  const [page, setPage] = useState(0)
  switch (page) {
    case 0:
      currentPage = <Home />
      break;
    case 1:
      currentPage = <About />
      break;
    case 2:
      currentPage = <Blog />
      break;
    case 3:
      currentPage = <CharacterGallery />
      break;
    case 4:
      currentPage = <Login />
  }
  
  return (
    <div className='wrapper'>
      <Router>
        <NavBar/>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/about' element={<About />}/>
            <Route path='/blogs' element={<Blog />}/>
            <Route path='/gallery' element={<CharacterGallery />}/>
            <Route path='/login' element={<Login />}/>
          </Routes>
      </Router>
    </div>
  )
}

export default App
