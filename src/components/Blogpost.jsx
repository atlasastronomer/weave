const Blogpost = ({blog, handleDeleteBlog}) => {
  return(
    <div className='blog-container'>
      <div className='blog-header'>
        <p className='blog-title'> Title: {blog.title} </p>
      </div>
      <p> Date: {blog.date} </p>
      <p> Author: {blog.author} </p>
      <p> Content: {blog.content} </p>
      <button onClick={handleDeleteBlog}>Delete Blog</button>
    </div>
  )
}

export { Blogpost }