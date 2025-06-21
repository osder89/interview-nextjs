import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  transpilePackages: ['pg', 'pg-hstore', 'sequelize'],
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        pg: path.resolve(__dirname, 'node_modules/pg'),
      }
    }
    return config
  },
  redirects: async () => [
    {
      source: '/',
      destination: '/login',
      permanent: false,
    },
  ],
}

export default nextConfig
