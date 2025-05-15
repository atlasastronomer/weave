import { useState, useEffect } from 'react'
import { Wallpaper } from "../Wallpaper"
import aboutService from "../../services/aboutService"
import './About.css'

const About = () => {

  const [about, setAbout] = useState('')
  const [aboutInput, setAboutInput] = useState('')
  const [showEditAbout, setShowEditAbout] = useState(false)
  const [token, setToken] = useState('')
  const [name, setName] = useState('')

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedName = localStorage.getItem('name')
    setToken(storedToken)
    setName(storedName)

    if (storedToken) {
      aboutService.setToken(storedToken)
      loadAbout()
    }
  }, [])

  const loadAbout = async () => {
    try {
      const res = await aboutService.getAbout()
      const result = res.data
      setAbout(result.about)
    }
    catch (error) {
      console.log(error)
    }
  }

  const handleEditAbout = () => {
    setShowEditAbout(!showEditAbout)
  }

  const handleSubmitAbout = async (e) => {
    e.preventDefault()
    
    const newAbout = {
      about: aboutInput
    }

    const res = await aboutService.changeAbout(newAbout)
    const result = res.data

    setAbout(result.about)
    setAboutInput('')
    setShowEditAbout(false)
  }

  return (
    <>
      <Wallpaper/>
      <div>
        <div className='about-container'>
          <p className='about-title'>About Page</p>
          <p className='about-name'>{name}</p>
          {showEditAbout ?
            <form onSubmit={handleSubmitAbout}>
              <div className='about-input-container'>
                <input
                  className='about-input'
                  placeholder='About Me'
                  value={aboutInput}
                  onChange = {e => setAboutInput(e.target.value)}
                />
                <button type='submit' className='upload-delete-btn' style={{width: '100px'}}>Save</button>
              </div>
            </form>
            :
            <p className='about-text'>{about}</p>
          }
          <div onClick={handleEditAbout} className='pencil-icon'>
            {showEditAbout ? <i className="fa-solid fa-xmark fa-lg fa-icon"></i> : <i className="fa-solid fa-pencil fa-lg fa-icon"></i>}
          </div>
        </div>
      </div>
    </>
  )
}

export { About }