const Blogpost = ({blog, handleDeleteBlog}) => {
  return (
    <div className='blog-container'>
      <div className='blog-header'>
        <p className='blog-title'>{blog.title} </p>
      </div>
      <div className='blog-info'>
        <p> {blog.author} &#x2022; {blog.date} </p>
      </div>
      <div className='blog-body'>
        <p> {blog.content} </p>
      </div>
      <button className='delete-blog-btn' onClick={handleDeleteBlog}>Delete Blog</button>
    </div>
  )
}

export { Blogpost }
