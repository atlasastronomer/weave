import { useState, useEffect } from 'react'
import { AdvancedImage } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen'
import { dpr } from '@cloudinary/url-gen/actions/delivery'
import { byRadius } from '@cloudinary/url-gen/actions/roundCorners'
import { Avatar } from '../Home/Avatar'

import userService from '/src/services/userService'
import avatarService from '/src/services/avatarService'

const GalleryPost = ({username, post, handleDeletePost}) => {
  const [token, setToken] = useState('')
  const [avatar, setAvatar] = useState('')

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
    }
  })

  useEffect(() => {
    const fetchAvatar = async () => {
      const avatar = await avatarService.getAvatarByUsername(username)
      setAvatar(avatar)
    }

    fetchAvatar()
  }, [])

  return(
    <div className='post-container'>
      <div className='post-header'>
        <Avatar avatar={avatar} classname={'gallery-avatar'}/>
        <div className='post-information'>
          <div className='post-title'>
            <p>{post.title} </p>
          </div>
          <div className='post-date'>
            <p> {post.author} &#x2022; {post.date} </p>
          </div>
        </div>
      </div>
      <AdvancedImage
        className='gallery-image container'
        cldImg={cld.image(post.publicId)
          .roundCorners(byRadius(20))
          .delivery(dpr('auto'))
        }
      />
    </div>
  )
}

export { GalleryPost }
