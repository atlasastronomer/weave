import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Blog } from '../Blog/Blog'
import { Gallery } from '../Gallery/Gallery'
import { LinkPage } from '../Links/LinkPage'
import './Create.css'

const CreateButton = ({icon, text, color}) => {
  return (
    <div className='create-btn-wrapper'>
      <button className='create-btn' style={{backgroundColor: `${color}`}}>
        <i className={`fa-solid fa-3x fa-black ${icon}`}></i>
      </button>
      <p className='create-label'>{text}</p>
    </div>
  )
}

const Create = ({closeCreate}) => {
  const [token, setToken] = useState('')
  const location = useLocation()
  const isCreatingLink = location.pathname === '/new/link'
  const isCreatingBlog = location.pathname === '/new/blog'
  const isCreatingPost = location.pathname === '/new/post'

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    setToken(storedToken)
  })

  return (
      <div className='create-container-wrapper'>
        <div className='create-btn-row'>
          <CreateButton icon={'fa-link'} text={'Link'} color={'#ffffff'}/>
          <CreateButton icon={'fa-blog'} text={'Blog'} color={'#ffffff'}/>
          <CreateButton icon={'fa-image'} text={'Image'} color={'#ffffff'}/>
        </div>
        <button className='create-cancel-btn' onClick={(closeCreate)}>
          <i className='fa-solid fa-xl fa-xmark fa-black'></i>
        </button>
      </div>
  )
}

export { Create }