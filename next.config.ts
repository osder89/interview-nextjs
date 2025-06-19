import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  webpack: (config, { isServer }): any => {
    if (isServer) {
      config.externals = config.externals || []
      config.externals.push(
        (
          { request }: { request: string },
          callback: (error?: Error | null, result?: string) => void
        ) => {
          if (/^(pg|pg-hstore|sequelize)$/.test(request)) {
            return callback(null, `commonjs ${request}`)
          }
          callback()
        }
      )
    }
    return config
  },
  redirects: async () => [
    {
      source: '/',
      destination: '/login',
      permanent: false
    }
  ]
}

export default nextConfig
