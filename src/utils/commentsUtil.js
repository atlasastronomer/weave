const buildCommentMap = (comments) => {
  const map = {}
  const addToMap = (comment) => {
    if (comment.id) {
      map[comment.id.toString()] = comment
    }

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

  const traverse = (commentList, isReply = false) => {
    commentList
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
      .forEach(comment => {

        const parentId = comment.parent ? comment.parent.toString() : null

        const computedParentUsername =
          isReply && parentId
            ? commentMap[parentId]?.user?.username || null
            : null

        const parentUsername = comment.parentUsername || computedParentUsername

        thread.push({
          ...comment,
          isReply,
          parentUsername,
        })

        if (comment.children?.length) {
          traverse(comment.children, true)
        }
      })
  }

  comments
    .filter(c => !c.parent)
    .forEach(root => traverse([root]))

  return thread
}

export default { buildCommentMap, createThread }
