import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '/src/services/authService'
import './Login.css'

const Signup = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [emptyFieldError, setEmptyFieldError] = useState('')
  const [usernameError, setUserNameError] = useState('')

  const handleNameChange = (target) => {
    setName(target.value)
    setEmptyFieldError('')
    setUserNameError('')
  }

  const handleUsernameChange = (target) => {
    setUsername(target.value)
    setEmptyFieldError('')
    setUserNameError('')
  }

  const handlePasswordChange = (target) => {
    setPassword(target.value)
    setEmptyFieldError('')
    setUserNameError('')
  }

  const handleSignup = async (e) => {
    e.preventDefault()

    if (!name || !username || !password) {
      setUserNameError('')
      setEmptyFieldError('* Please fill out all fields')
      return
    }

    if (username.length < 3) {
      setUserNameError('* Username must be at least 3 characters long')
      return
    }

    try {
      const newUser = await authService.signup('http://localhost:3001/api/signup', {name, username, password})
      localStorage.setItem("token", newUser.token)
      localStorage.setItem("username",user.username)
      localStorage.setItem("name",user.name)
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
            {emptyFieldError ? emptyFieldError : ''}
            {usernameError ? usernameError : ''}
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