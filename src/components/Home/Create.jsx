import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { NewBlog } from '../Blog/CreateBlog'
import { NewPost } from '../Gallery/CreatePost'
import { NewLink } from '../Links/CreateLink'
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

const Create = () => {
  const [token, setToken] = useState('')
  const navigate = useNavigate()

  const location = useLocation()
  const isCreatingLink = location.pathname === '/new/link'
  const isCreatingBlog = location.pathname === '/new/blog'
  const isCreatingPost = location.pathname === '/new/image'

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
          <button className='create-cancel-btn' onClick={() => navigate(-1)}>
            <i className='fa-solid fa-xl fa-xmark fa-black'></i>
          </button>
        </>}
        {isCreatingLink && <NewLink/>}
        {isCreatingBlog && <NewBlog/>}
        {isCreatingPost && <NewPost/>}
      </div>
  )
}

export { Create }