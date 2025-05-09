import { AdvancedImage } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen'
import { scale } from '@cloudinary/url-gen/actions/resize'
import { dpr } from '@cloudinary/url-gen/actions/delivery'
import { byRadius } from '@cloudinary/url-gen/actions/roundCorners'

const GalleryPost = ({post, handleDeletePost}) => {

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dxmjrqdzj'
    }
  })

  return(
    <div className='post-container'>
      <div className='post-title'>
        <p>{post.title} </p>
      </div>
      <div className='post-info'>
        <p> {post.author} &#x2022; {post.date} </p>
      </div>
      <AdvancedImage
        className='gallery-image'
        cldImg={cld.image(post.publicId)
          .roundCorners(byRadius(20))
          .delivery(dpr('auto'))
        }
      />
      <button className='delete-post-btn' onClick={handleDeletePost}>Delete Post</button>
    </div>
  )
}

export { GalleryPost }
