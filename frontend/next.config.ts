import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    distDir: "build",
    images: {
        minimumCacheTTL: 60,
        remotePatterns: [{
            protocol: "https",
            hostname: "ui-avatars.com",
            port: "",
            pathname: "/api/**"
        },
        {
            protocol: "http",
            hostname: "localhost",
            port: "8080",
            pathname: "/images/**"
        }],
    },
    eslint:{
        ignoreDuringBuilds: true
    }
}

export default nextConfig;
