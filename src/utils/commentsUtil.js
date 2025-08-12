const buildCommentMap = (comments) => {
  const map = {}
  const addToMap = (comment) => {
    map[comment._id] = comment
    if (comment.children?.length) {
      comment.children.forEach(addToMap)
    }
  }
  comments.forEach(addToMap)
  return map
}

const createThread = (comments) => {
  const commentMap = buildCommentMap(comments)
  const thread = []
  const traverse = (comment, isReply = false) => {
    const parentUsername = isReply && comment.parent
      ? commentMap[comment.parent]?.user?.username || null
      : null

    thread.push({
      ...comment,
      isReply,
      parentUsername,
    })

    if (comment.children?.length) {
      comment.children.forEach((child) => traverse(child, true))
    }
  }
  comments.forEach((comment) => {
    if (!comment.parent) traverse(comment)
  })
  return thread
}

export default { buildCommentMap, createThread }