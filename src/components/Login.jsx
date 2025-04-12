import { useState, useEffect } from 'react'
import axios from 'axios'
import axiosService from '/src/services/axios'
import './Login.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()
      const user = await axiosService.login('http://localhost:3001/api/login', {username, password})
      setUser(user)
      setUsername('')
      setPassword('')
  }
  return(
    <>
      <div className='login-container'>
        <form onSubmit={handleLogin}>
          <p className='login-title'> Sign in </p>
          <div className='button-wrapper'>
            <div className='input-box'>
              <input
                placeholder='Username'
                type='text'
                value={username}
                name='Username'
                onChange={({ target }) => setUsername(target.value)}
              />
              <span className='icon-label'>
                <p className='fa-solid fa-user fa-sm' style={{margin: '0px'}}></p>
              </span>
            </div>
          </div>
          <div className='button-wrapper'>
            <div className='input-box'>
              <input
                placeholder='Password'
                type='password'
                value={password}
                name='Password'
                onChange={({ target }) => setPassword(target.value)}
              />
              <span className='icon-label'>
                <p className='fa-solid fa-lock fa-sm' style={{margin: '0px'}}></p>
              </span>
            </div>
          </div>
          <button type='submit' className='login-btn'>Login</button>
        </form>
        <div className='register-info'>
          <label className='register-label'> Not a Member? &nbsp; </label>
          <a className='register-link'> Register Here </a>
        </div>
      </div>
    </>
  )
}

export { Login }
