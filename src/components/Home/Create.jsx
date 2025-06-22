import { useState, useEffect } from 'react'
import './Create.css'

const Create = ({closeCreate}) => {
  const [token, setToken] = useState('')

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    setToken(storedToken)
  })

  return (
      <div className='create-container-wrapper'>
        <div className='create-container'>
          <button className='create-cancel-btn' onClick={(closeCreate)}>
            <i className='fa-solid fa-xl fa-xmark fa-black'></i>
          </button>
        </div>
      </div>
  )
}

export { Create }