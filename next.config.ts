import type { NextConfig } from "next";
import removeImports from "next-remove-imports";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: { esmExternals: true },
};

export default removeImports()(nextConfig);
