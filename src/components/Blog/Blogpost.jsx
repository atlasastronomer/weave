import { useState, useEffect } from 'react'
import { Avatar } from '../Home/Avatar'

import userService from '/src/services/userService'
import avatarService from '/src/services/avatarService'
import likesService from '../../services/likesService'

import formatTimestamp from '../../services/formatTimestamp'

const Blogpost = ({username, blog, isMoreOpen, toggleMore, isSelf, handleDeleteBlog}) => {
  const [token, setToken] = useState('')
  const [avatar, setAvatar] = useState('')


  const [likeCount, setLikeCount] = useState(blog.likes.length)
  const [liked, setLiked] = useState(false)
  
  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    setToken(storedToken)

    if (storedToken) {
      userService.setToken(storedToken)
      avatarService.setToken(storedToken)
      likesService.setToken(storedToken)
    }
  })

  useEffect(() => {
    if (token) {
      const userId = JSON.parse(atob(token.split('.')[1])).id
      setLiked(blog.likes.includes(userId))
    }
  }, [token, blog.likes])

  useEffect(() => {
    const fetchAvatar = async () => {
      const avatar = await avatarService.getAvatarByUsername(username)
      setAvatar(avatar)
    }

    fetchAvatar()
  }, [])

  const likeBlog = async (blogId) => {
    await likesService.postBlogLike(blogId)

    if (liked) {
      setLikeCount(prev => prev - 1)
    } else {
      setLikeCount(prev => prev + 1)
    }
    setLiked(prev => !prev)
  }

  return (
    <div className='blog-container'>
      <div className='blog-header'>
        <Avatar avatar={avatar} classname={'gallery-avatar'}/>
        <div className='blog-information'>
          <p className='blog-title'>{blog.title} </p>
          <p className='blog-date'> {blog.author} &#x2022; {formatTimestamp(blog.timestamp)} </p>
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
      <div className='blog-footer'>
        <div className='blog-likes-display'>
          {likeCount} {likeCount === 1 ? 'Like' : 'Likes'}
        </div>
      <i
        className={`fa-heart fa-xl ${liked ? 'fa-solid fa-red-heart' : 'fa-regular fa-gray-heart'}`}
        onClick={() => likeBlog(blog.id)}
      ></i>
      </div>
    </div>
  )
}

export { Blogpost }