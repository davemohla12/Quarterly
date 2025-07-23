import { marked } from 'marked'
import { posts } from '$src/blog/posts'
import dayjs from 'dayjs'
import { redirect } from '@sveltejs/kit'
import { today } from '$src/settings/settings'

const markdownFiles = import.meta.glob('$src/blog/posts/*.md', { query: '?raw', import: 'default', eager: true })

const load = async ({ params }) => {
  const slug = params.slug
  const filePath = `/src/blog/posts/${slug}.md`
  const fileContent = markdownFiles[filePath]
  const post = posts.find(post => post.slug === slug)

  if (dayjs(post.date).isAfter(today)) {
    throw redirect(302, '/blog')
  }

  const formattedDate = dayjs(post.date).format('MMMM D, YYYY')
  const contentWithDate = fileContent.replace('{{DATE}}', formattedDate)
  const htmlContentWithDate = marked(contentWithDate)

  return {  
    content: htmlContentWithDate,
    post: {
      ...post,
      date: post.date.toISOString()
    }
  }
}

export { load }