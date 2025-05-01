import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import { crop, fill, scale, fit, thumbnail, pad } from '@cloudinary/url-gen/actions/resize';
import { format } from '@cloudinary/url-gen/actions/delivery';
import galleryService from '/src/services/galleryService'
import { byRadius } from '@cloudinary/url-gen/actions/roundCorners';
import './Home.css'

const Avatar = ({avatar}) => {
  
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dxmjrqdzj'
    }
  })

  return(
    <AdvancedImage
      cldImg={avatar ? cld.image(avatar.publicId).resize(scale().width(200).height(200)).roundCorners(byRadius(20)).format('png') :
        cld.image('a4wnscg3rzebph187nng').resize(scale().width(200).height(200)).roundCorners(byRadius(20)).format('png')}
    />
  )
}

export { Avatar }