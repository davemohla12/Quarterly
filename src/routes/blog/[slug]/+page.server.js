import { marked } from 'marked'
import { posts } from '$src/blog/posts'

const markdownFiles = import.meta.glob('$src/blog/posts/*.md', { query: '?raw', import: 'default', eager: true })

const load = async ({ params }) => {
  const slug = params.slug
  const filePath = `/src/blog/posts/${slug}.md`
  const fileContent = markdownFiles[filePath]
  const htmlContent = marked(fileContent)
  const post = posts.find(post => post.slug === slug)

  return {  
    content: htmlContent,
    post: {
      ...post,
      date: post.date.toISOString()
    }
  }
}

export { load }