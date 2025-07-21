import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		minify: 'terser',
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true
			}
		},
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: ['posthog-js', '@supabase/supabase-js'],
					analytics: ['@sentry/browser']
				}
			}
		}
	},
	test: {
    globals: true,       
    environment: 'node'
  }
})