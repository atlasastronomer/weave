import { useState } from 'react'

import { NavBar } from './components/NavBar.jsx'
import { Home } from './components/Home.jsx'
import { About } from './components/About.jsx'
import { Blog } from './components/Blog.jsx'
import { CharacterGallery } from './components/CharacterGallery.jsx'

import './assets/App.css'

const App = () => {
  let currentPage = <Home/>
  const [page, setPage] = useState(0)
  switch (page) {
    case 0:
      currentPage = <Home />
      break;
    case 1:
      currentPage = <About />
      break;
    case 2:
      currentPage = <Blog />
      break;
    case 3:
      currentPage = <CharacterGallery />
      break;
  }
  
  return (
    <div className='wrapper'>
        <NavBar setPage={setPage}/>
        {currentPage}
    </div>
  )
}

export default App
