/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Monaco editor ships large worker bundles; keep them out of the server trace.
  webpack: (config) => {
    config.resolve.fallback = { ...config.resolve.fallback, fs: false };
    return config;
  },
};

export default nextConfig;
