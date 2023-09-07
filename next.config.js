const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  return {
    env: {
      APP_URL:
        phase === PHASE_DEVELOPMENT_SERVER
          ? "http://localhost:4000/api/v1"
          : "https://michaelayeni.com",
    },
    images: {
      domains: ["res.cloudinary.com"],
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    reactStrictMode: true,
  };
};
