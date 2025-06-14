const MediaLink = ({link, handleDeleteLink, showDeleteLink}) => {
  return (
    <div className='media-link-wrapper'>
      <a href={link.mediaLink} className="media-link-btn">
        {link.title}
      </a>
      {showDeleteLink && <div onClick={handleDeleteLink} className='delete-link-btn'>
        <i className="fa-icon fa-solid fa-trash"></i>
      </div>}
    </div>
  )
}

export { MediaLink }