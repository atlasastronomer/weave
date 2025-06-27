import { Avatar } from '../Home/Avatar'

const UserEntry = ({user, openModal}) => {
  const name = user.name
  const username = user.username
  const avatar = user.avatar

  return (
    <div className='user-search-row' onClick={() => openModal(user.username)}>
      <Avatar avatar={avatar} classname={'user-search-avatar'}/>
      <div className='user-search-info'>
        <p className='user-search-name'>{name}</p>
        <p className='user-search-username'>@{username}</p>
      </div>
    </div>
  )
}

export { UserEntry }
