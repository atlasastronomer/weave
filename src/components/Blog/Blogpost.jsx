import { useState, useEffect } from 'react'
import { Avatar } from '../Home/Avatar'

import userService from '/src/services/userService'
import avatarService from '/src/services/avatarService'

const Blogpost = ({username, blog, isMoreOpen, toggleMore, isSelf, handleDeleteBlog}) => {
  const [token, setToken] = useState('')
  const [avatar, setAvatar] = useState('')

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    setToken(storedToken)

    if (storedToken) {
      userService.setToken(storedToken)
      avatarService.setToken(storedToken)
    }
  })

  useEffect(() => {
    const fetchAvatar = async () => {
      const avatar = await avatarService.getAvatarByUsername(username)
      setAvatar(avatar)
    }

    fetchAvatar()
  }, [])

  return (
    <div className='blog-container'>
      <div className='blog-header'>
        <Avatar avatar={avatar} classname={'gallery-avatar'}/>
        <div className='blog-information'>
          <p className='blog-title'>{blog.title} </p>
          <p className='blog-date'> {blog.author} &#x2022; {blog.date.split(' ').slice(0, 4).join(' ')} </p>
        </div>
        <div className='more-wrapper'>
          <button className='more-button' onClick={() => toggleMore(blog.id)}>
            <i className={`fa-solid fa-2x fa-icon fa-ellipsis`}></i>
          </button>
          {isMoreOpen && (
            <div className='more-container'>
              {isSelf &&
                <div className='more-button-wrapper' onClick={handleDeleteBlog}>
                  <i className='fa-solid fa-trash fa-red'></i>
                  <p className='more-text-red'>Delete</p>
                </div>
              }
            </div>
          )}
        </div>
      </div>
      <div className='blog-body'>
        <p> {blog.content} </p>
      </div>
    </div>
  )
}

export { Blogpost }