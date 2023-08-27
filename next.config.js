/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
	webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
	  config.externals.push({
		'utf-8-validate': 'commonjs utf-8-validate',
		'bufferutil': 'commonjs bufferutil',
	  })
	  return config
	},
	env: {
		API_URL: process.env.API_URL,
		PRIVATE_KEY: process.env.PRIVATE_KEY,
		ALCHEMY_API_KEY: process.env.ALCHEMY_API_KEY
	  }
  }
