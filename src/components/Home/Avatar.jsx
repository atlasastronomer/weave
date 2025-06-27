import { AdvancedImage } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen'
import { scale } from '@cloudinary/url-gen/actions/resize'
import { dpr } from '@cloudinary/url-gen/actions/delivery'
import { byRadius } from '@cloudinary/url-gen/actions/roundCorners'

const Avatar = ({ avatar, classname }) => {
  const cld = new Cloudinary({
    cloud: { cloudName: 'dxmjrqdzj' }
  })

  const img = cld.image(avatar?.publicId || 'a4wnscg3rzebph187nng')
    .resize(scale().width(400))
    .roundCorners(byRadius(20))
    .format('png')
    .delivery(dpr('auto'))

  return(
    <AdvancedImage cldImg={img} className={`${classname}`} />
  )
}

export { Avatar }
