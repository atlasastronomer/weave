import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'

import { NavBar } from './components/NavBar.jsx'
import { Home } from './components/Home.jsx'
import { About } from './components/About.jsx'
import { Blog } from './components/Blog.jsx'
import { CharacterGallery } from './components/CharacterGallery.jsx'
import { Login } from './components/Login.jsx'
import { Account } from './components/Account.jsx'
import { Signup } from './components/Signup.jsx'

import './assets/App.css'

const App = () => {
  const token = localStorage.getItem('token')
  
  return (
    <div className='wrapper'>
      <Router>
        <NavBar/>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/about' element={<About />}/>
            <Route path='/blogs' element={<Blog />}/>
            <Route path='/gallery' element={<CharacterGallery />}/>
            <Route path='/account' element={token ? <Login/> : <Account />}/>
            <Route path='/login' element={token ? <Account/> : <Login />}/>
            <Route path='/signup' element={token ? <Account/> : <Signup />}/>
          </Routes>
      </Router>
    </div>
  )
}

export default App
