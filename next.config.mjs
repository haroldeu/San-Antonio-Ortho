import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

const repoBasePath = "/San-Antonio-Ortho";

/** @type {import('next').NextConfig | ((phase: string) => import('next').NextConfig)} */
const nextConfig = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const isVercel = Boolean(process.env.VERCEL);
  const basePath =
    isDev || isVercel ? "" : process.env.NEXT_PUBLIC_BASE_PATH ?? repoBasePath;

  return {
    reactStrictMode: true,
    output: isDev || isVercel ? undefined : "export",
    trailingSlash: true,
    images: {
      unoptimized: true
    },
    basePath,
    assetPrefix: basePath
  };
};

export default nextConfig;
