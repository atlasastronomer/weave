import { useNavigate } from 'react-router-dom'
import './Account.css'

const Account = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    localStorage.removeItem('username')

    navigate('/login')
    window.location.reload()
  }
  return(
    <div className='main-page-wrapper'>
      <div className='account-wrapper'>
        <p className='logout-title'> Logout </p>
        <button className='logout-btn' onClick={handleLogout}> Logout </button>
      </div>
    </div>
  )
}

export { Account }
