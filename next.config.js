/** @type {import('next').NextConfig} */
const nextConfig = {
  // 開発でuseEffectが2回実行の問題を回避
  reactStrictMode: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

module.exports = nextConfig;
