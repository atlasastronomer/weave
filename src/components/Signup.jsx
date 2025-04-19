import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import axiosService from '/src/services/axios'
import './Login.css'

const Signup = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [credentialsError, setCredentialsError] = useState('')

  const handleNameChange = (target) => {
    setName(target.value)
    setCredentialsError('')
  }

  const handleUsernameChange = (target) => {
    setUsername(target.value)
    setCredentialsError('')
  }

  const handlePasswordChange = (target) => {
    setPassword(target.value)
    setCredentialsError('')
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    try {
      const newUser = await axiosService.signup('http://localhost:3001/api/signup', {name, username, password})
      localStorage.setItem("token", newUser.token)
      navigate('/')
      window.location.reload()
    }
    catch (error) {
      console.log(error)
    }
  }

  return(
    <div className='login-container-wrapper'>
      <div className='login-container'>
        <form onSubmit={handleSignup}>
          <p className='login-title'> Sign Up </p>

          <div className='button-wrapper'>
            <div className='input-box'>
              <input
                placeholder='Name'
                type='text'
                value={name}
                name='Username'
                onChange={({ target }) => handleNameChange(target)}
              />
              <span className='icon-label'>
                <p className='fa-regular fa-user fa-sm' style={{margin: '0px'}}></p>
              </span>
            </div>
          </div>

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
          <button type='submit' className='login-btn'>Sign Up</button>
        </form>
        <div className='register-info'>
          <label className='register-label'> Already a member? &nbsp; </label>
          <label className='register-link' onClick={() => navigate('/login')}> Login here </label>
        </div>
      </div>
    </div>
  )
}

export { Signup }