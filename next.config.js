/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['pg', 'pg-hstore', 'sequelize'],
  redirects: async () => [
    {
      source: '/',
      destination: '/login',
      permanent: false
    }
  ]
}

export default nextConfig
