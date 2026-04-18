/** @type {import('next').NextConfig} */
const buildingDemo = process.env.BUILD_DEMO === '1';

const nextConfig = {
    reactStrictMode: false,
    transpilePackages: ['fastcomments-nextjs'],
    ...(buildingDemo
        ? {
              output: 'export',
              basePath: '/commenting-system-for-nextjs',
              trailingSlash: true,
              images: { unoptimized: true },
              typescript: { ignoreBuildErrors: true },
          }
        : {}),
};

export default nextConfig;
