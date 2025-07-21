import fs from 'fs/promises'
import path from 'path'
import { marked } from 'marked'
import { posts } from '$src/blog/posts'
 
 const load = async ({ params }) => {
  const slug = params.slug
  const filePath = path.join('src', 'blog', 'posts', `${slug}.md`)
  const fileContent = await fs.readFile(filePath, 'utf-8')
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
