/** @type {import('next').NextConfig} */
const path = require("path");
// require("dotenv").config();
const API_URL = process.env.API_URL;
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost"],
  },
};

module.exports = nextConfig;
