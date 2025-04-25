import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import { crop, fill, scale, fit, thumbnail, pad } from '@cloudinary/url-gen/actions/resize';
import { format } from '@cloudinary/url-gen/actions/delivery';
import galleryService from '/src/services/galleryService'
import { byRadius } from '@cloudinary/url-gen/actions/roundCorners';
import './CharacterGallery.css'

const GalleryPost = ({post, handleDeleteBlog}) => {

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
        cldImg={cld.image(post.publicId).resize(scale().width(500)).roundCorners(byRadius(20)).format('png')}
      />
    </div>
  )
}

export { GalleryPost }
