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

  // Sort top-level comments newest-first
  const sortedTopLevel = [...comments]
    .filter(c => !c.parent)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))

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
      // Sort children newest-first before traversing
      const sortedChildren = [...comment.children]
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      sortedChildren.forEach((child) => traverse(child, true))
    }
  }

  sortedTopLevel.forEach((comment) => traverse(comment))
  return thread
}

export default { buildCommentMap, createThread }
