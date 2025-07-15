import { redirect } from '@sveltejs/kit'
import { showComingSoon } from '$src/settings/settings'
import { PUBLIC_ENVIRONMENT } from '$env/static/public' 

const load = async ({ url }) => {
  if (showComingSoon) {
    const isComingPage = url.pathname === '/coming'
    const isAdminRoute = url.pathname.startsWith('/(admin)') || url.pathname.startsWith('/admin')
    const isAuthRoute = url.pathname.startsWith('/(auth)') || url.pathname.startsWith('/auth')
  
    if (!isComingPage && !isAdminRoute && !isAuthRoute && PUBLIC_ENVIRONMENT == 'production') {
      throw redirect(302, '/coming')
    }
  }
  return {}
}

export { load }