import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Blog } from '../Blog/Blog'
import { Gallery } from '../Gallery/Gallery'
import { LinkPage } from '../Links/LinkPage'
import './Create.css'

const CreateButton = ({icon, text, color, navigateTo}) => {
  const navigate = useNavigate()

  return (
    <div className='create-btn-wrapper'>
      <button className='create-btn' style={{backgroundColor: `${color}`}} onClick={() => navigate(`/new/${navigateTo}`)}>
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
        {(!isCreatingLink && !isCreatingBlog && !isCreatingPost) &&
        <>
          <div className='create-btn-row'>
            <CreateButton icon={'fa-link'} text={'Link'} color={'#ffffff'} navigateTo={'link'}/>
            <CreateButton icon={'fa-blog'} text={'Blog'} color={'#ffffff'} navigateTo={'blog'}/>
            <CreateButton icon={'fa-image'} text={'Image'} color={'#ffffff'} navigateTo={'image'}/>
          </div>
          <button className='create-cancel-btn' onClick={(closeCreate)}>
            <i className='fa-solid fa-xl fa-xmark fa-black'></i>
          </button>
        </>}
        {isCreatingLink && <LinkPage/>}
        {isCreatingBlog && <Blog/>}
        {isCreatingPost && <Gallery/>}
      </div>
  )
}

export { Create }