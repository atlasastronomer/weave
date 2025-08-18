import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import { Dashboard } from './components/Dashboard/Dashboard.jsx'
import { Home } from './components/Home/Home.jsx'
import { UserPage } from './components/UserPage/UserPage.jsx'
import { Account } from './components/Account/Account.jsx'
import { Login } from './components/Authentication/Login.jsx'
import { Signup } from './components/Authentication/Signup.jsx'
import { Messages } from './components/Messages/Messages.jsx'

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
            <Route path='/' element={token ? <Navigate to='/for_you'/> : <Navigate to='/login'/>}/>
            <Route path='/for_you' element={<Home />}/>
            <Route path='/following' element={<Home />}/>

            {/* <Route path='/explore/*' element={<></>}/> */}
            <Route path='/account' element={token ? <Account/> : <Login />}/>
            <Route path='/login' element={token ? <Account/> : <Login />}/>
            <Route path='/signup' element={token ? <Account/> : <Signup />}/>

            <Route path='/new/*' element={<></>}/>
            <Route path='/profile/*' element={<></>}/>
            <Route path='/messages' element={<Messages/>}/>
            <Route path='/messages/:username' element={<Messages/>}/>

            <Route path='/:username/*' element={<UserPage />}/>
          </Routes>
      </Router>
    </div>
  )
}

export default App
