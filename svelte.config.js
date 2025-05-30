import adapter from '@sveltejs/adapter-auto'
import { resolve } from 'path'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

const config = {
	preprocess: vitePreprocess(),
	compilerOptions: {
    runes: true
  },
	kit: {
		adapter: adapter(),
		alias: {
			$src: resolve('src')
		}	
	}
}

export default config
