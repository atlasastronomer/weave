const createThread = (comments) => {
  const thread = []

  const traverse = (comment, isReply = false) => {
    thread.push({ ...comment, isReply })
    if (comment.children?.length > 0) {
      comment.children.forEach(child => traverse(child, true))
    }
  }

  comments.forEach(comment => {
    if (!comment.parent) traverse(comment)
  })

  return thread
}

const Comment = ({ comment }) => (
  <div style={{ marginLeft: comment.isReply ? 20 : 0, marginTop: 8 }}>
    <strong>@{comment.user.username}</strong> {comment.content}
  </div>
)

const CommentThread = ({ comments }) => {
  const flatComments = createThread(comments)
  return (
    <div>
      {flatComments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  )
}

export { CommentThread }
