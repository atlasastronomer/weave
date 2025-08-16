import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '/src/services/authService'
import galleryService from '/src/services/galleryService'
import './Login.css'

const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [credentialsError, setCredentialsError] = useState('')

  const handleUsernameChange = (target) => {
    setUsername(target.value)
    setCredentialsError('')
  }

  const handlePasswordChange = (target) => {
    setPassword(target.value)
    setCredentialsError('')
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await authService.login({username, password})
      localStorage.setItem('token', user.token)
      localStorage.setItem('username',user.username)
      localStorage.setItem('name',user.name)
      navigate('/')
      window.location.reload()
    }
    catch (error) {
      setCredentialsError('* Your username and password do not match. Try again.')
    }
  }

  return(
    <div className='login-container-wrapper'>
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
                onChange={({ target }) => handleUsernameChange(target)}
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
                onChange={({ target }) => handlePasswordChange(target)}
              />
              <span className='icon-label'>
                <p className='fa-solid fa-lock fa-sm' style={{margin: '0px'}}></p>
              </span>
            </div>
          </div>
          <div className='error-container'>
            {credentialsError ? credentialsError : ''}
          </div>
          <button type='submit' className='login-btn'>Sign In</button>
        </form>
        <div className='register-info'>
          <label className='register-label'> Not a Member? &nbsp; </label>
          <label className='register-link' onClick={() => navigate('/signup')}> Register Here </label>
        </div>
      </div>
    </div>
  )
}

export { Login }
