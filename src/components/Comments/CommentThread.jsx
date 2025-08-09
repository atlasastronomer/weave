import { useState, useEffect, useMemo, useRef } from 'react'
import { Avatar } from '../Home/Avatar'

import commentsUtil from './commentsUtil'
import formatTimestamp from '../../services/formatTimestamp'
import likesService from '../../services/likesService'

import './comment.css'
import './commentChatbox.css'

const CommentChatbox = (parentId) => {
  const [token, setToken] = useState('')
  const [input, setInput] = useState('')
  const textareaRef = useRef(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    setToken(storedToken)

    if (storedToken) {
      likesService.setToken(storedToken)
    }
  }, [])

  const handleChange = (e) => {
    setInput(e.target.value)

    const textarea = textareaRef.current
    textarea.style.height = "2rem"
    textarea.style.height = `${textarea.scrollHeight}px`
  }

  return (
    <textarea
      ref={textareaRef}
      className='comment-input-box'
      placeholder='Message'
      value={input}
      onChange={handleChange}
    />
  )
}


const Comment = ({ comment }) => {
  const [token, setToken] = useState('')
  const [userId, setUserId] = useState('')

  const [likeCount, setLikeCount] = useState(comment.likes.length)
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    setToken(storedToken)

    if (storedToken) {
      likesService.setToken(storedToken)
    }
  })

  useEffect(() => {
    if (token) {
      const userId = JSON.parse(atob(token.split('.')[1])).id
      setLiked(comment.likes.includes(userId))
    }
  }, [token, comment.likes])

  const likeComment = async (commentId) => {
    const comment = await likesService.postCommentLike(commentId)

    if (liked) {
      setLikeCount(prev => prev - 1)
    } else {
      setLikeCount(prev => prev + 1)
    }
    setLiked(prev => !prev)
  }

  return (
    <div className='comment-wrapper' style={{ marginLeft: comment.isReply ? 20 : 0 }}>
      <div className='comment-header'>
        <Avatar avatar={comment.user.avatar} classname={'gallery-avatar'} />
        <div className='comment-header-info'>
          <p className='comment-username'>@{comment.user.username}</p>
          <p className='comment-date'>{formatTimestamp(comment.timestamp)}</p>
        </div>
      </div>
      <p className='comment-content'>
        {comment.parentUsername && <span className='comment-reply'>@{comment.parentUsername} </span>}
        {comment.content}
      </p>
      <div className='comment-footer'>
        <div className='comment-likes-display-wrapper'>
          <i
            className={`fa-heart fa-lg ${liked ? 'fa-solid fa-red-heart' : 'fa-regular fa-gray-heart'}`}
            style={{ marginRight: '8px'}}
            onClick={() => likeComment(comment.id)}
          ></i>
         {likeCount}
        </div>
      </div>
    </div>
  )
}

const CommentThread = ({ comments }) => {
  const flatComments = useMemo(() => commentsUtil.createThread(comments), [comments])
  return (
    <div>
      <CommentChatbox />
      {flatComments.map(comment => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </div>
  )
}

export { CommentThread }
