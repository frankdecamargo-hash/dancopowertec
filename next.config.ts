import type { NextConfig } from "next";

// Export estático (pasta out/) para publicar por FTP em hospedagem sem Node.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
