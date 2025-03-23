const Blogpost = ({blog, handleDeleteBlog}) => {
  return(
    <div className='blog-container'>
      <p> Date: {blog.date} </p>
      <p> Title: {blog.title} </p>
      <p> Author: {blog.author} </p>
      <p> Content: {blog.content} </p>
      <button onClick={handleDeleteBlog}>Delete Blog</button>
    </div>
  )
}

export { Blogpost }