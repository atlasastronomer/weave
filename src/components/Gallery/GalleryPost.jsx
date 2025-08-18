import { useState, useEffect } from 'react'
import { AdvancedImage } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen'
import { dpr } from '@cloudinary/url-gen/actions/delivery'
import { byRadius } from '@cloudinary/url-gen/actions/roundCorners'
import { Avatar } from '../Home/Avatar'
import { CommentThread } from '../Comments/CommentThread'

import userService from '/src/services/userService'
import avatarService from '/src/services/avatarService'
import likesService from '../../services/likesService'
import commentService from '../../services/commentService'
import favoritesService from '../../services/favoritesService'

import formatTimestamp from '../../utils/formatTimestamp'

const GalleryPost = ({ username, post, isMoreOpen, toggleMore, isSelf, handleDeletePost }) => {
  const [token, setToken] = useState('')
  const [avatar, setAvatar] = useState('')

  const [likeCount, setLikeCount] = useState(post.likes.length)
  const [liked, setLiked] = useState(false)

  const [comments, setComments] = useState([])
  const [displayComments, setDisplayComments] = useState(false)

  const [favorited, setFavorited] = useState(false)

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dxmjrqdzj'
    }
  })

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    setToken(storedToken)

    if (storedToken) {
      userService.setToken(storedToken)
      avatarService.setToken(storedToken)
      likesService.setToken(storedToken)
      favoritesService.setToken(storedToken)
    }
  }, [])

  useEffect(() => {
    if (token) {
      const userId = JSON.parse(atob(token.split('.')[1])).id
      setLiked(post.likes.includes(userId))

      const fetchFavorites = async () => {
        try {
          const res = await favoritesService.getFavorites()
          const isFavorited = res.some(fav => fav.item.id === post.id)
          setFavorited(isFavorited)
        } catch (err) {
          console.error('Error fetching favorites', err)
        }
      }
      fetchFavorites()
    }
  }, [token, post.likes, post.id])

  useEffect(() => {
    const fetchAvatar = async () => {
      const avatar = await avatarService.getAvatarByUsername(username)
      setAvatar(avatar)
    }

    fetchAvatar()
  }, [username])

  useEffect(() => {
    const fetchComments = async () => {
      const res = await commentService.fetchComments(post.id)
      setComments(res.thread)
    }
    fetchComments()
  }, [post.id])

  const likePost = async (postId) => {
    try {
      await likesService.postImageLike(postId)
      if (liked) {
        setLikeCount(prev => prev - 1)
      } else {
        setLikeCount(prev => prev + 1)
      }
      setLiked(prev => !prev)
    } catch (err) {
      console.error('Error liking post', err)
    }
  }

  const favoritePost = async (postId) => {
    try {
      await favoritesService.toggleFavorite('Post', postId)
      setFavorited(prev => !prev)
    } catch (err) {
      console.error('Error toggling favorite', err)
    }
  }

  return (
    <div className='post-container'>
      <div className='post-header'>
        <Avatar avatar={avatar} classname={'gallery-avatar'} />
        <div className='post-information'>
          <p className='post-title'>{post.title}</p>
          <p className='post-date'>{post.author} &#x2022; {formatTimestamp(post.timestamp)}</p>
        </div>
        <div className='more-wrapper'>
          <button className='more-button' onClick={() => toggleMore(post.id)}>
            <i className='fa-solid fa-2x fa-icon fa-ellipsis'></i>
          </button>
          {isMoreOpen && (
            <div className='more-container'>
              {isSelf &&
                <div className='more-button-wrapper' onClick={handleDeletePost}>
                  <i className='fa-solid fa-trash fa-red'></i>
                  <p className='more-text-red'>Delete</p>
                </div>
              }
            </div>
          )}
        </div>
      </div>
      <AdvancedImage
        className='gallery-image container'
        cldImg={cld.image(post.publicId)
          .roundCorners(byRadius(20))
          .delivery(dpr('auto'))
        }
      />
      <div className='gallery-footer'>
        <div className='gallery-likes-display'>
          {likeCount} {likeCount === 1 ? 'Like' : 'Likes'}
        </div>
        <i
          className={`fa-heart fa-xl ${liked ? 'fa-solid fa-red-heart' : 'fa-regular fa-gray-heart'}`}
          onClick={() => likePost(post.id)}
        ></i>
        <i
          className={`fa-comment fa-xl ${displayComments ? 'fa-solid fa-blue-comment': 'fa-regular fa-gray-comment'}`}
          onClick={() => {setDisplayComments(prev => !prev)}}
        ></i>
        <i
          className={`fa-star fa-xl ${favorited ? 'fa-solid fa-gold-star': 'fa-regular fa-gray-star'}`}
          onClick={() => favoritePost(post.id)}
        ></i>
      </div>
      {displayComments && <CommentThread comments={comments} postId={post.id} onModel='Post' />}
    </div>
  )
}

export { GalleryPost }
