import { useState, useEffect, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar } from '../Home/Avatar'

import commentsUtil from '../../utils/commentsUtil'
import formatTimestamp from '../../utils/formatTimestamp'
import likesService from '../../services/likesService'
import commentService from '../../services/commentService'

import './comment.css'
import './commentChatbox.css'

const CommentChatbox = ({ replyingTo, setReplyingTo, postId, onModel, onCommentPosted }) => {
  const [token, setToken] = useState('')
  const [input, setInput] = useState('')
  const [username, setUsername] = useState('')

  const textareaRef = useRef(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    setToken(storedToken)

    if (storedToken) {
      likesService.setToken(storedToken)
      commentService.setToken(storedToken)
    }
  }, [])

  useEffect(() => {
    const storedUsername = localStorage.getItem('username')
    if (storedUsername) {
      setUsername(storedUsername)
    }
  }, [])

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [input])

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const commentObject = {
      content: input,
      parent: replyingTo?.id || null,
      onModel: onModel,
    }

    try {
      const newComment = await commentService.postComment(postId, commentObject)
      onCommentPosted(newComment) // Notify parent (CommentThread) of the new comment
      setInput('')
      setReplyingTo(null)
    }
    catch (err) {
      console.error('Error posting comment', err)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {replyingTo && (
        <div className='comment-replying-to-container'>
          <p className='comment-replying-to-label'>
            Replying to&nbsp;
            <span className='comment-replying-to-username'>@{replyingTo.user.username}</span>
          </p>
          <i
            className='fa-solid fa-circle-xmark fa-xl comment-cancel-label'
            onClick={() => setReplyingTo()}
          ></i>
        </div>
      )}
      <div className="comment-input-wrapper">
        <textarea
          ref={textareaRef}
          className='comment-input-box'
          placeholder={`Reply as @${username}`}
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          rows={1}
        />
        {input.trim() ? 
          <i
            className='fa-solid fa-paper-plane comment-send-btn'
            type='button'
            onClick={handleSend}
          ></i>
          :
          <i
            className='fa-solid fa-paper-plane comment-unsent-btn'
            type='button'
          ></i>
        }
      </div>
    </>
  )
}

const Comment = ({ comment, setReplyingTo }) => {
  const [token, setToken] = useState('')
  const navigate = useNavigate()

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
          <p
            className='comment-username'
            onClick={() => navigate(`/${comment.user.username}`)}
          >@{comment.user.username}</p>
          <p className='comment-date'>{formatTimestamp(comment.timestamp)}</p>
        </div>
      </div>
      <p className='comment-content'>
        {comment.parentUsername && 
          <span 
            className='comment-replying-to-username'
            onClick={() => navigate(`/${comment.parentUsername}`)}
          > @{comment.parentUsername} </span>
        }
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
        <p
          className='comment-reply-label'
          onClick={() => setReplyingTo(comment)}
        >Reply</p>
      </div>
    </div>
  )
}

const CommentThread = ({ comments, postId, onModel }) => {
  const [replyingTo, setReplyingTo] = useState()
  const [localComments, setLocalComments] = useState(comments)

  const flatComments = useMemo(() =>
    commentsUtil.createThread(localComments),
    [localComments]
  )

  // UPDATED: handleNewComment now inserts replies into parent's children array
  const handleNewComment = (newComment) => {
    setLocalComments(prevComments => {
      const updatedComments = [...prevComments]

      if (newComment.parent) {
        // Function recursively finds the parent comment and appends the new reply
        const addReplyToParent = (commentsList) => {
          return commentsList.map(comment => {
            if (comment.id === newComment.parent) {
              const updatedComment = {
                ...comment,
                children: comment.children ? [...comment.children, newComment] : [newComment]
              }
              return updatedComment
            }
            if (comment.children && comment.children.length) {
              return {
                ...comment,
                children: addReplyToParent(comment.children)
              }
            }
            return comment
          })
        }
        return addReplyToParent(updatedComments)
      }

      // Top-level comments remain appended to the root array
      return [...updatedComments, newComment]
    })
  }

  return (
    <div style={{width: '100%'}}>
      <CommentChatbox
        replyingTo={replyingTo}
        setReplyingTo={setReplyingTo}
        postId={postId}
        onModel={onModel}
        onCommentPosted={handleNewComment}
      />
      {flatComments.map(comment => (
        <Comment
          key={comment.id}
          comment={comment}
          setReplyingTo={setReplyingTo}
        />
      ))}
    </div>
  )
}

export { CommentThread }
