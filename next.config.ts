import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['three'],
};
module.exports = {
  allowedDevOrigins: ['10.194.207.181'],
}
export default nextConfig;
