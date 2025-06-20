import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import { Dashboard } from './components/Navigation/Dashboard.jsx'
import { Home } from './components/Home/Home.jsx'
import { Login } from './components/Authentication/Login.jsx'
import { Account } from './components/Account/Account.jsx'
import { Signup } from './components/Authentication/Signup.jsx'
import { UserPage } from './components/UserPage/UserPage.jsx'

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
            <Route path='/about' element={<Home />}/>
            <Route path='/blogs' element={<Home />}/>
            <Route path='/gallery' element={<Home />}/>
            <Route path='/account' element={!token ? <Login/> : <Account />}/>
            <Route path='/login' element={token ? <Account/> : <Login />}/>
            <Route path='/signup' element={token ? <Account/> : <Signup />}/>
            <Route path='/explore' element={<></>}/>
            <Route path='/:username' element={<UserPage />}/>
            <Route path='/:username/blogs' element={<UserPage />}/>
            <Route path='/:username/gallery' element={<UserPage />}/>
          </Routes>
      </Router>
    </div>
  )
}

export default App
