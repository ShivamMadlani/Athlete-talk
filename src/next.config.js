/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
      appDir: true,
    },
    env: {
      DB_URI: "mongodb://localhost:27017/next13-auth",
      NEXTAUTH_SECRET: "codingwithabbas",
  
      GOOGLE_CLIENT_ID:
        "122364265187-cjn7qumnrvlu0235013v8f0c11rcbp4s.apps.googleusercontent.com",
      GOOGLE_CLIENT_SECRET: "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",

    },
  };
  
  module.exports = nextConfig;