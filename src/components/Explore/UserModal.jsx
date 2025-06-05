import {useParams} from 'react-router-dom'
import './UserModal.css'

const UserModal = ({ closeModal }) => {
  const { username } = useParams()

  return (
    <div className='modal'>
      <div className='overlay' onClick={closeModal}></div>
      <div className='modal-wrapper'>
        <h2>{username}'s Profile</h2>
        <button className='close-modal' onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  )
}

export { UserModal }
