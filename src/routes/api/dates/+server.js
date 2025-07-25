import { json } from '@sveltejs/kit'
import dayjs from 'dayjs'
import { posts } from '$src/blog/posts.js'
import { writeFileSync } from 'fs'
import { join } from 'path'

const generateBlogPostDates = (posts, startDate, averageDays, spread) => {
  const numberOfPosts = posts.length
  const dates = []
  let currentDate = dayjs(startDate)
  const minDays = averageDays - spread
  const maxDays = averageDays + spread
  for (let i = 0; i < numberOfPosts; i++) {
    dates.push(currentDate.format('YYYY-MM-DD'))
    if (i < numberOfPosts - 1) {
      const randomDays = Math.floor(Math.random() * (maxDays - minDays + 1)) + minDays
      currentDate = currentDate.add(randomDays, 'day')
    }
  }
  return dates
}

const generatePostsFileContent = (posts) => {
  let content = `import dayjs from 'dayjs'\n\nconst posts = [\n`
  
  posts.forEach((post, index) => {
    content += `  {\n`
    content += `    slug: "${post.slug}",\n`
    content += `    title: "${post.title}",\n` 
    content += `    description: "${post.description}",\n`
    content += `    date: dayjs("${post.date}")\n`
    content += `  }${index < posts.length - 1 ? ',' : ''}\n`
  })
  
  content += `]\n\nexport { posts }\n`
  return content
}


export const POST = async ({ request }) => {
    const { startDate, averageDays, spread } = await request.json()
    
    const dates = generateBlogPostDates(posts, startDate, averageDays, spread)

    for (const post of posts) {
      post.date = dates.shift()
    }

    const updatedContent = generatePostsFileContent(posts)
    const postsPath = join(process.cwd(), 'src/blog/posts.js')
    writeFileSync(postsPath, updatedContent)

    return json({ 
      success: true, 
      posts: posts,
      message: 'Updated successfully' 
    })

}