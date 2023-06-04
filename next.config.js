/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // async redirects() {
  //   return [
  //     process.env.MAINTENANCE_MODE === "true"
  //       ? {
  //           source: "/((?!maintenance).*)",
  //           destination: "/maintenance",
  //           permanent: false,
  //         }
  //       : null,
  //   ].filter(Boolean);
  // },
};

module.exports = nextConfig;
