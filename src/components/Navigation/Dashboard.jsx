import { Outlet } from 'react-router-dom'
import { NavBar } from './NavBar'
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import { crop, fill, scale, fit, thumbnail, pad } from '@cloudinary/url-gen/actions/resize';
import { format } from '@cloudinary/url-gen/actions/delivery';
import galleryService from '/src/services/galleryService'
import { byRadius } from '@cloudinary/url-gen/actions/roundCorners';
import './Dashboard.css'

const Dashboard = () => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dxmjrqdzj'
    }
  })

  return(
    <div className='dashboard'>
      <NavBar />
      <div className='main-page'>
        <Outlet/>
      </div>
    </div>
  )
}

export { Dashboard }