import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import { Dashboard } from './components/Navigation/Dashboard.jsx'
import { NavBar } from './components/Navigation/NavBar.jsx'
import { Home } from './components/Home/Home.jsx'
import { About } from './components/About/About.jsx'
import { Blog } from './components/Blog/Blog.jsx'
import { Gallery } from './components/Gallery/Gallery.jsx'
import { Login } from './components/Authentication/Login.jsx'
import { Account } from './components/Account/Account.jsx'
import { Signup } from './components/Authentication/Signup.jsx'
import { Explore } from './components/Explore/Explore.jsx'

import './assets/App.css'

const App = () => {
  const [token, setToken] = useState(null)
  
  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [])
  
  return (
    <div className='wrapper'>
      <Router>
        <Dashboard/>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/about' element={<About />}/>
            <Route path='/blogs' element={<Blog />}/>
            <Route path='/gallery' element={<Gallery />}/>
            <Route path='/account' element={!token ? <Login/> : <Account />}/>
            <Route path='/explore/*' element={<Explore />} />
            <Route path='/login' element={token ? <Account/> : <Login />}/>
            <Route path='/signup' element={token ? <Account/> : <Signup />}/>
          </Routes>
      </Router>
    </div>
  )
}

export default App
